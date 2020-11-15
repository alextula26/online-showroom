import React from 'react';
import { Layout, Row, Col, Breadcrumb, Card, Button } from 'antd';

import 'antd/dist/antd.css';

class Models extends React.Component {
    render() {

        const { Sider, Content } = Layout;
        const { Item } = Breadcrumb;
        const { Meta } = Card;        

        return (            
            <Layout style={{ height: '100vh' }}>
                <Sider width={300} style={{ color: '#FFFFFF' }}>
                    <h1>Sider</h1>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                    <p>1</p>
                </Sider>
                <Content>
                    <Breadcrumb separator=">">
                        <Item>Home</Item>
                        <Item href="">Application Center</Item>
                        <Item href="">Application List</Item>
                        <Item>An Application</Item>
                    </Breadcrumb>

                    <h1>Автомобили в наличии</h1>

                    <Row gutter={[16, 16]}>
                    <Col span={8} style={{ border: '1px solid red' }}>
                        <Card
                        loading={false}
                        style={{ width: '100%' }}
                        cover={
                            <img
                            alt="example"
                            src="https://195004.selcdn.ru/ref/catalog/10201/4_s.jpg"
                            />
                        }
                        >
                        <Meta
                            title="от 2 853 000 с"
                            description="This is the description"
                        />

                        <Button type="primary">Primary Button</Button>

                        </Card>
                    </Col>
                    <Col span={8} style={{ border: '1px solid red' }}>
                        <Card
                        loading={false}
                        style={{ width: '100%' }}
                        cover={
                            <img
                            alt="example"
                            src="https://195004.selcdn.ru/ref/catalog/12347/4/16b6053964.jpg"
                            />
                        }
                        >
                        <Meta
                            title="от 1 578 000 с"
                            description="This is the description"
                        />

                        <Button type="primary">Primary Button</Button>
                        </Card>
                    </Col>
                    <Col span={8} style={{ border: '1px solid red' }}>Col</Col>
                    <Col span={8} style={{ border: '1px solid red' }}>Col</Col>
                    <Col span={8} style={{ border: '1px solid red' }}>Col</Col>
                    <Col span={8} style={{ border: '1px solid red' }}>Col</Col>
                    </Row>
                </Content>
            </Layout>

        );
    }
}

export default Models;
