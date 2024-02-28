"use client";
import {
  Box,
  Button,
  FileButton,
  Flex,
  Group,
  Image,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import NextImage from "next/image";
import noimage from "../../../../public/images/companylogo-noimage.svg";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { updateCompanySchema } from "@/app/schema/Company/schema";
import useToast from "@/app/hooks/useToast";
import { Company } from "@prisma/client";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  company: Company;
};

const UpdateCompany: FC<Props> = ({ company }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(company.logoUrl);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { successToast, errorToast } = useToast();

  const form = useForm({
    initialValues: {
      name: company.name,
      uen: company.uen,
      street: company.street,
      city: company.city,
      state: company.state,
      postcode: company.postcode,
      phone: company.phone,
      bankname: company.bankname,
      branchname: company.branchname,
      accountname: company.accountname,
      accounttype: company.accounttype,
      accountnumber: company?.accountnumber,
      bankcode: company?.bankcode,
      swiftcode: company?.swiftcode,
      branchnumber: company?.branchnumber,
    },
    validate: zodResolver(updateCompanySchema),
  });

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    Object.keys(form.values).forEach((key) => {
      const value = form.values[key as keyof typeof form.values];
      if (key !== "file") {
        if (typeof value === "string") {
          formData.append(key, value);
        }
      }
    });

    try {
      const response = await fetch("/api/company/update", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      router.push("/company");
      router.refresh();
      setLoading(false);
      successToast({
        title: "Company detail updated",
        message: "Your company detail has been updated successfully.",
      });
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFileChange = (file: File) => {
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <>
      <Box maw="800px">
        <form onSubmit={form.onSubmit(open)}>
          <Box mt="lg">
            <Text fw={500} size="sm">
              Logo Image
            </Text>
            <Flex gap="lg" align={"center"}>
              <Image
                radius="md"
                component={NextImage}
                src={previewUrl || noimage}
                width={100}
                height={100}
                alt="Company Logo"
              />
              <Box>
                <Group justify="flex-start">
                  <FileButton
                    onChange={(file) => file && handleFileChange(file)}
                    accept="image/png,image/jpeg"
                  >
                    {(props) => <Button {...props}>Update image</Button>}
                  </FileButton>
                </Group>

                {file && (
                  <Text size="sm" ta="center" mt="sm">
                    Picked file: {file.name}
                  </Text>
                )}
              </Box>
            </Flex>
          </Box>

          <TextInput
            label="Legal/Trading name"
            placeholder="Custom layout"
            mt="lg"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="UEN"
            placeholder="Custom layout"
            mt="lg"
            {...form.getInputProps("uen")}
          />

          <TextInput
            label="Address"
            placeholder="Street address"
            mt="lg"
            {...form.getInputProps("street")}
          />
          <TextInput
            placeholder="Town/City"
            mt="lg"
            {...form.getInputProps("city")}
          />
          <Flex gap="md" mt="lg">
            <TextInput
              placeholder="State/Region"
              w="50%"
              {...form.getInputProps("state")}
            />
            <TextInput
              placeholder="Postal code"
              w="50%"
              {...form.getInputProps("postcode")}
            />
          </Flex>

          <TextInput
            label="Phone"
            placeholder="Custom layout"
            mt="lg"
            {...form.getInputProps("phone")}
          />
          {/* Bank */}
          <TextInput
            label="Bank Name"
            placeholder="Custom layout"
            mt="lg"
            {...form.getInputProps("bankname")}
          />
          <TextInput
            label="Branch Name"
            placeholder="Custom layout"
            mt="lg"
            {...form.getInputProps("branchname")}
          />
          <TextInput
            label="A/C Name"
            placeholder="Custom layout"
            mt="lg"
            {...form.getInputProps("accountname")}
          />
          <Select
            label="A/C Type"
            placeholder="Custom layout"
            mt="lg"
            data={[
              {
                label: "Savings",
                value: "Savings",
              },
              {
                label: "Current",
                value: "Current",
              },
            ]}
            {...form.getInputProps("accounttype")}
          />
          <TextInput
            label="A/C #"
            placeholder="Custom layout"
            mt="lg"
            {...form.getInputProps("accountnumber")}
          />
          <TextInput
            label="Bank Code"
            placeholder="Custom layout"
            mt="lg"
            {...form.getInputProps("bankcode")}
          />
          <TextInput
            label="Swift BIC Code"
            placeholder="Custom layout"
            mt="lg"
            {...form.getInputProps("swiftcode")}
          />
          <TextInput
            label="Branch #"
            placeholder="Custom layout"
            mt="lg"
            {...form.getInputProps("branchnumber")}
          />
          {/* <Textarea
          label="Invoice Remarks"
          placeholder="Custom layout"
          mt="lg"
          resize="vertical"
          {...form.getInputProps("remarks")}
        /> */}

          <Group justify="center" mt="xl">
            <Button fullWidth type="submit" loading={loading}>
              Update
            </Button>
          </Group>
        </form>
      </Box>

      <Modal
        opened={opened}
        onClose={close}
        size="md"
        title="Update organization"
      >
        <Text>Are you sure you want to proceed?</Text>
        <Group mt="xl" justify="center">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            Proceed
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default UpdateCompany;
