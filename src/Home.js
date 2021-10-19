import { Card, Row, Typography, Space, Spin, Col, message, Button } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
const { Title } = Typography;
const fetchPosts = async () => {
  try {
    const { data } = await axios.get("https://gorest.co.in/public/v1/posts");
    return data;
  } catch (error) {
    throw Error("Unable to fetch posts");
  }
};

const Home = () => {
  const { data, isLoading } = useQuery("posts", fetchPosts, {
    onError: (error) => {
      message.error(error.message);
    },
  });
  return (
    <div style={{ margin: "60px" }}>
      {isLoading ? (
        <Spin className="centerSpin" />
      ) : (
        <>
          {data?.data.map((post) => (
            <Card>
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
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
