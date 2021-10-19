import { Card, Row, Spin } from "antd";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const RQUsers = () => {
  const fetchUsers = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return data;
  };
  const { data: users, isLoading } = useQuery("users", fetchUsers);

  const { data, isLoading: postFecthing, isFetching } = useQuery("posts");

  console.log(data, isFetching, "fecthing data");

  if (isLoading) {
    return (
      <Row align="middle" className="centerSpin">
        <Spin tip="Loading..." />
      </Row>
    );
  }

  return (
    <div className="site-card-border-less-wrapper">
      {users?.map((user, key) => {
        const { name, phone, username, website } = user;
        return (
          <div className="cardContainer">
            <Card
              title="User Details"
              bordered={false}
              style={{ width: 300 }}
              key={user?.id}
              extra={<Link to={`/user/${user?.id}`}>More</Link>}
            >
              <p>Name : {name}</p>
              <p>Phone Number : {phone}</p>
              <p>userName : {username}</p>
              website link : <a href={`http://${website}`}> {website}</a>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default RQUsers;
