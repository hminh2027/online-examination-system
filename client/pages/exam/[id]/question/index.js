import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import QuestionCard from "../../../../components/QuestionCard";
import { getAPI } from "../../../../apis/axios.js";

const questionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    getAPI(`exam/${id}`).then((res) => {
      if (!res.data) alert("EXAM NOT FOUND!");
      console.log(res);
    });
  }, [router.isReady]);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} w={"80%"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Tạo Câu Hỏi
          </Heading>
        </Stack>
        <QuestionCard examId={id} />
      </Stack>
    </Flex>
  );
};

export default questionPage;
