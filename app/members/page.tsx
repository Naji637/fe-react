"use client";

import Badge from "@/components/Badge";
import Table from "@/components/Table";
import React, { useState } from "react";
import {
  Members,
  useMembersQuery,
  useCreateMemberMutation,
  useDeleteMemberMutation,
  useUpdateMemberMutation,
} from "@/hooks/useMember";

import { checkStatusAnggota } from "../helper/checkStatus";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
// import { checkStatusAnggota } from "../helper/checkStatus";

export default function Page() {
  const [dataMember, setDataMember] = useState<Members | null | undefined>(
    undefined,
  );
  const createMutation = useCreateMemberMutation();
  const updateMutation = useUpdateMemberMutation();
  const deleteMutation = useDeleteMemberMutation();
  const { data, isLoading } = useMembersQuery();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-5 ">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium ">Members</h1>
          <p className="text-muted">Kelola data anggota perpustaakan.</p>
        </div>
        <div className="flex items-center ">
          <Button onClick={() => setDataMember(null)} variant="primary">
            + Add Members
          </Button>
          {dataMember !== undefined && (
            <Modal
              isSubmiting={createMutation.isPending || updateMutation.isPending}
              initial={dataMember}
              onClose={() => setDataMember(undefined)}
              onSubmit={(payload) => {
                if (dataMember) {
                  updateMutation.mutate(
                    {
                      id: dataMember.id,
                      payload,
                    },
                    { onSuccess: () => setDataMember(undefined) },
                  );
                } else {
                  createMutation.mutate(
                    payload,

                    { onSuccess: () => setDataMember(undefined) },
                  );
                }
              }}
            />
          )}
        </div>
      </div>
      {isLoading && (
        <div>
          <h1>Fetching Data...</h1>
        </div>
      )}
      {!isLoading && (
        <Table<Members>
          data={data ?? []}
          keyFor={(p) => String(p.id)}
          column={[
            {
              header: "No",
              content: (_,index) => index+1,
            },
            {
              header: "No. Members",
              content: (c) => c.membership_number,
            },
            {
              header: "Name",
              content: (c) => c.name,
            },
            {
              header: "Alumni",
              content: (c) => (
                <Badge variant={checkStatusAnggota(c.alumni)}>
                  {c.alumni ? "Alumni" : "Non Alumni"}
                </Badge>
              ),
            },

            {
              header: "Aksi",
              content: (c) => (
                <div className="flex gap-3">
                  <Button onClick={() => setDataMember(c)} variant="secondary">
                    Edit
                  </Button>

                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Apakah Anda yakin ingin menghapus anggota ini?",
                        )
                      ) {
                        deleteMutation.mutate(c.id);
                      }
                    }}
                    variant="warning"
                  >
                    Delete
                  </Button>
                </div>
              ),
            },
          ]}
        ></Table>
      )}
    </div>
  );
}
