import { Card, Row, Typography, Spin, Col, message } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import AddNewPost from "../components/AddNewPost";
const { Title } = Typography;
const fetchPost = async (id) => {
  try {
    const { data } = await axios.get(
      `https://gorest.co.in/public/v1/posts/${id}`
    );
    return data;
  } catch (error) {
    throw Error("Unable to fetch post");
  }
};

const Pagination = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery(
    ["post", parseInt(id)],
    () => fetchPost(id),
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        message.error(error.message);
      },
    }
  );
  return (
    <div style={{ margin: "60px" }}>
      {isLoading ? (
        <Spin className="centerSpin" />
      ) : (
        <>
          <AddNewPost isUpdate id={data?.data?.id} />

          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={2}>UserId : {data?.data.user_id}</Title>
              </Col>
              <Col>
                <Title level={2}>PostId : {data?.data.id}</Title>
              </Col>
            </Row>
            <Title level={2}>{data?.data?.title}</Title>
            <Title level={5}>{data?.data?.body}</Title>
          </Card>
        </>
      )}
    </div>
  );
};

export default Pagination;
