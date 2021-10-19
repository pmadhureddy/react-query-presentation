import { Button, Form, Input, message, Row, Typography } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
const { Title } = Typography;

const addNewPost = async (postData) => {
  try {
    const { data } = await axios.post(
      `https://gorest.co.in/public/v1/users/1360/posts`,
      postData,
      {
        headers: {
          Authorization:
            "Bearer dd50ad8bb0f7592ebf4d04fa2db40ffcb4a47aff40c39b8f5c77925253f9ee9a",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error, "error");
    throw Error(error);
  }
};

const updatePost = async (postData) => {
  try {
    const { data } = await axios.patch(
      `https://gorest.co.in/public/v1/posts/${postData?.id}`,
      postData,
      {
        headers: {
          Authorization:
            "Bearer dd50ad8bb0f7592ebf4d04fa2db40ffcb4a47aff40c39b8f5c77925253f9ee9a",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error, "error");
    throw Error(error);
  }
};

const AddNewPost = ({ isUpdate, id }) => {
  const [form] = Form.useForm();
  const cache = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    "addNewPost",
    isUpdate ? updatePost : addNewPost,
    {
      onError: (error) => {
        message.error(error.message);
      },
      onSuccess: () => {
        message.success("Post Added Successfully");
        form.resetFields();
        isUpdate
          ? cache.invalidateQueries(["post", id])
          : cache.invalidateQueries("posts");
      },
    }
  );

  const onFinish = async (values) => {
    console.log("Success:", values);

    isUpdate ? await mutateAsync({ ...values, id }) : await mutateAsync(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row justify="center">
        <Title level={2}>{isUpdate ? "Update Post" : "Add New Post"}</Title>
      </Row>
      <Form
        form={form}
        name="basic"
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 16,
        // }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter title!",
            },
          ]}
        >
          <Input placeholder="Enter Username" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="body"
          rules={[
            { required: true },
            { message: "Please enter content!" },
            { type: "string", min: 6, message: "please enter 6 chars" },
          ]}
        >
          <Input.TextArea placeholder="Enter Content" />
        </Form.Item>
        <Form.Item
        //   wrapperCol={{
        //     offset: 8,
        //     span: 16,
        //   }}
        >
          <Button type="primary" block loading={isLoading} htmlType="submit">
            {isUpdate ? "Update" : "Add"} Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewPost;
