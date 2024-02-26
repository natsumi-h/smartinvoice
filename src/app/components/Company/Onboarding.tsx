"use client";
import {
  Box,
  Button,
  FileButton,
  Flex,
  Group,
  Image,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import NextImage from "next/image";
import noimage from "../../../../public/images/companylogo-noimage.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import { updateCompanySchema } from "@/app/schema/Company/schema";
import useToast from "@/app/hooks/useToast";

const Onboarding = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { successToast, errorToast } = useToast();
  const form = useForm({
    validate: zodResolver(updateCompanySchema),
  });

  const handleSubmit = async (values: Record<string, unknown>) => {
    setLoading(true);
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    Object.keys(values).forEach((key) => {
      const value = values[key];

      if (key !== "file") {
        if (typeof value === "string") {
          formData.append(key, value);
        }
      }

      if (key === "accounttype") {
        if (typeof value === "string") {
          formData.append(key, value.toLowerCase());
        }
      }
    });

    try {
      const response = await fetch("/api/company", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      router.push("/company");
      router.refresh();
      setLoading(false);
      successToast({
        title: "Company detail created",
        message: "Your company detail has been created successfully.",
      });
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      errorToast(error.message);
    }
  };

  const handleFileChange = (file: File) => {
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <Box maw="800px">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Box mt="lg">
          <Text fw={500} size="sm">
            Logo Image
          </Text>
          <Flex gap="lg" align={"center"}>
            <Image
              radius="md"
              component={NextImage}
              src={previewUrl || noimage} // 変更部分
              width={100}
              height={100}
              // fallbackSrc="https://placehold.co/200x200?text=no image"
              alt="Company Logo"
            />
            <Box>
              <Group justify="flex-start">
                <FileButton
                  onChange={(file) => file && handleFileChange(file)}
                  accept="image/png,image/jpeg"
                >
                  {(props) => <Button {...props}>Upload image</Button>}
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
          data={["Savings", "Current"]}
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
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Onboarding;
