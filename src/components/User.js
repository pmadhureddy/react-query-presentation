import { Card, Row, Spin } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
const User = () => {
  const { id: userId } = useParams();
  console.log(userId, "userId");

  const fetchPost = async (id) => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return data;
  };

  const {
    data: userData,
    isLoading,
    isFetching,
  } = useQuery(["post", userId], () => fetchPost(userId), {
    refetchOnWindowFocus: false,
  });

  const { id, name, phone, username, email, website, company, address } =
    userData || {};

  if (isLoading) {
    return (
      <Row align="middle" justify="center" className="centerSpin">
        <Spin tip="Loading..." />
      </Row>
    );
  }

  return (
    <div className="cardContainer">
      <Card
        title="User Details"
        bordered={false}
        style={{ width: 300 }}
        key={id}
      >
        <p>{name}</p>
        <p>{phone}</p>
        <p>{username}</p>
        <p>{email}</p>
        <p>{website}</p>
        <p>{company?.name}</p>
        <p>{address?.city}</p>
        <p></p>
      </Card>
    </div>
  );
};

export default User;
