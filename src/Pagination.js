import { Card, Row, Typography, Spin, Col, message, Button } from "antd";
import axios from "axios";
import { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import AddNewPost from "./components/AddNewPost";
const { Title } = Typography;
const fetchPosts = async (id) => {
  try {
    const { data } = await axios.get(
      `https://gorest.co.in/public/v1/users/1360/posts?page=${id}`
    );
    return data;
  } catch (error) {
    throw Error("Unable to fetch posts");
  }
};

const deletePost = async (id) => {
  try {
    const { data } = await axios.delete(
      `https://gorest.co.in/public/v1/posts/${id}`,
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

const Pagination = () => {
  const [postId, setPostId] = useState();

  const cache = useQueryClient();

  const { id } = useParams();
  const history = useHistory();

  const pageId = parseInt(id);

  const { data, isLoading } = useQuery(
    ["posts", pageId],
    () => fetchPosts(pageId),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      onError: (error) => {
        message.error(error.message);
      },
    }
  );

  const { isLoading: isDeleting, mutateAsync } = useMutation(
    "deletePost",
    deletePost,
    {
      onError: (error) => {
        message.error(error.message);
      },
      onSuccess: () => {
        message.success("Post deleted successfully!");
        cache.invalidateQueries("posts");
      },
    }
  );

  return (
    <div style={{ margin: "60px" }}>
      {isLoading ? (
        <Spin className="centerSpin" />
      ) : (
        <>
          <AddNewPost />

          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "20px" }}
          >
            <Col>
              <Button
                type="primary"
                size="large"
                danger
                onClick={() => {
                  if (data.meta.pagination.links.previous !== null) {
                    history.push(`/${pageId - 1}`);
                  }
                }}
                disabled={data.meta.pagination.links.previous === null}
              >
                Previous
              </Button>
            </Col>
            <Col>
              <Title level={2}>Current Page : {pageId}</Title>
            </Col>
            <Col>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  history.push(`/${pageId + 1}`);
                }}
              >
                Next
              </Button>
            </Col>
          </Row>
          {data?.data.map((post) => (
            <>
              <Card key={post?.id}>
                <Row justify="end" style={{ marginBottom: "10px" }}>
                  <Col>
                    <Button
                      type="danger"
                      size="large"
                      loading={postId === post?.id && isDeleting}
                      onClick={async () => {
                        setPostId(post?.id);
                        await mutateAsync(post?.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
                <Link to={`/post/${post?.id}`}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Title level={2}>UserId : {post.user_id}</Title>
                    </Col>
                    <Col>
                      <Title level={2}>Id : {post.id}</Title>
                    </Col>
                  </Row>
                  <Title level={2}>{post?.title}</Title>
                  <Title level={5}>{post?.body}</Title>
                </Link>
              </Card>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default Pagination;
