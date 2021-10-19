import { useState } from "react";
import { Col, Row, Menu, Button } from "antd";
import { useHistory } from "react-router-dom";

const NavigationBar = () => {
  const [current, setCurrent] = useState("user");
  const history = useHistory();

  const handleClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    switch (e.key) {
      case "rquser":
        history.push("/users");
        break;
      case "table":
        history.push("/table");
        break;
      default:
        history.push("/");
        break;
    }
  };
  return (
    <Row gutter={[16, 16]}>
      <Row justify="center">
        <Menu mode="horizontal" onClick={handleClick} selectedKeys={[current]}>
          <Menu.Item key="user">Users</Menu.Item>
          <Menu.Item key="rquser">RQ Users</Menu.Item>
          <Menu.Item key="table">Table</Menu.Item>
        </Menu>
      </Row>
    </Row>
  );
};

export default NavigationBar;
