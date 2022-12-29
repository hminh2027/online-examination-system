import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Switch,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { getAPI, postAPI } from "../../apis/axios";

const createExamPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modules, setModules] = useState([]);
  const [data, setData] = useState({
    number: 0,
    moduleCode: "",
    title: "",
    duration: 0,
    password: "",
    numberOfQuestions: 0,
    score: 0,
  });

  useEffect(() => {
    getAPI("module").then((res) => {
      setModules(res.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(data);
    const rs = await postAPI("exam/create", data);
    console.log(rs);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Tạo Bài Kiểm Tra
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="number" isRequired>
              <FormLabel>Bài kiểm tra thứ:</FormLabel>
              <Input
                type="number"
                name="number"
                value={data.number}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="title" isRequired>
              <FormLabel>Tên bài kiểm tra:</FormLabel>
              <Input
                type="text"
                name="title"
                value={data.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="moduleCode" isRequired>
              <FormLabel>Môn học:</FormLabel>
              <Select
                placeholder="Chọn môn học..."
                onChange={handleInputChange}
                name="moduleCode"
              >
                {modules.map((m) => (
                  <option key={m.moduleCode} value={m.moduleCode}>
                    {m.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <HStack>
              <Box>
                <FormControl id="duration" isRequired>
                  <FormLabel>Thời lượng:</FormLabel>
                  <Input
                    type="number"
                    name="duration"
                    value={data.duration}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="numberOfQuestions" isRequired>
                  <FormLabel>Số câu hỏi:</FormLabel>
                  <Input
                    type="number"
                    name="numberOfQuestions"
                    value={data.numberOfQuestions}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="score" isRequired>
                  <FormLabel>Tổng điểm:</FormLabel>
                  <Input
                    type="number"
                    name="score"
                    value={data.score}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="paswordCheck" mb="0">
                Đặt mật khẩu?
              </FormLabel>
              <Switch
                id="paswordCheck"
                onChange={() => setShowPassword(!showPassword)}
              />
            </FormControl>
            {showPassword && (
              <FormControl id="password" isRequired>
                <FormLabel>Mật khẩu</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>
            )}
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={submitHandler}
              >
                Tạo
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default createExamPage;
