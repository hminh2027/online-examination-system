import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Flex,
  Stack,
  Heading,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import QuestionCard from "../../../../components/QuestionCard";
import { getAPI } from "../../../../apis/axios.js";

const questionPage = () => {
  const router = useRouter();
  const [exam, setExam] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    getAPI(`exam/${id}`).then((res) => {
      if (!res.data) alert("EXAM NOT FOUND!");
      else setExam(res.data);
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
          {exam && (
            <Text fontSize={"lg"} color={"gray.600"}>
              cho bài kiểm tra: <b>{exam.title}</b>
            </Text>
          )}
        </Stack>
        <QuestionCard examId={id} />
      </Stack>
    </Flex>
  );
};

export default questionPage;
