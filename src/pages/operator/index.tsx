import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import React, { useState, useRef, Fragment, useEffect } from 'react';
import { GridContent, PageContainer, FooterToolbar, RouteContext } from '@ant-design/pro-layout';
import { useModel, Link } from 'umi';
import { ColumnsType } from 'antd/es/table';
import { Table, Tag, Space, Button, Radio, Dropdown, Menu } from 'antd';
import { Card, Popover, Tabs, Row, Col, Divider, Badge, Switch, Typography, Slider } from 'antd';
import { SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
import { queryPosition } from './service';
import styles from './style.less';
const ButtonGroup = Button.Group;



const TableList: React.FC<{}> = (props) => {

  const params = props.match.params;
  const { initialState } = useModel('@@initialState');
  const [loading, setLoading] = useState<boolean>(true);
  const [positions, setPositions] = useState<API.Position[]>([]);

  useEffect(() => {
    setLoading(true);
    queryPosition(params.platform)
      .then(data => {
        setPositions(data);
        setLoading(false);
      }).catch(error => {
        setLoading(false);
      });
  }, [params.platform, params.symbol, params.contractType, params.direction]);

  const contractTypeOnChange = (e) => {
    props.history.push(`/operator/${params.platform}/${params.symbol}/${e.target.value}/${params.direction}/${params.type}`, { record: props.location.state.record });
  }

  const action = (
    <RouteContext.Consumer>
      {({ isMobile }) => {
        if (isMobile) {
          let mobileMenu = (
            <Menu>
              {
                props.location.state.record.contractTypes.map(contractType => {
                  return (
                    <Menu.Item key={contractType}>{contractType}</Menu.Item>
                  );
                })
              }
            </Menu>
          );
          return (
            <Dropdown.Button
              type="primary"
              icon={<DownOutlined />}
              overlay={mobileMenu}
              placement="bottomRight"
            >
              主操作
            </Dropdown.Button>
          );
        }
        return (
          <Fragment>
            <Radio.Group value={params.contractType} onChange={contractTypeOnChange}>
              {
                props.location.state.record.contractTypes.map(ct => {
                  return (
                    <Radio.Button key={ct} value={ct}>{ct}</Radio.Button>
                  );
                })
              }
            </Radio.Group>
          </Fragment>
        );
      }}
    </RouteContext.Consumer>
  );

  const columns: ColumnsType<API.Position> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'ContractTypes',
      key: 'contractTypes',
      dataIndex: 'contractTypes',
      render: contractTypes => (
        <>
          {contractTypes.map(contractType => {
            let color = contractType.indexOf('quarter') != -1 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={contractType}>
                {contractType}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => {
        if (text == 'disable') {
          return <Tag color='#cccc' key={text}>
            {text.toUpperCase()}
          </Tag>
        }
        return <Tag color='green' key={text}>
          {text.toUpperCase()}
        </Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        if (record.status == 'enable') {
          return (
            <Space size="middle">
              <Link to={{ pathname: `/operator/${params.platform}/${record.name}/${record.contractTypes[0]}/buy/open`, state: { record } }}>Operator</Link>
            </Space>
          );
        }
        return (<Space size="middle"></Space>);
      },
    },
  ];

  const CodePreview: React.FC<{}> = ({ children }) => (
    <pre className={styles.pre}>
      <code>
        <Typography.Text copyable>{children}</Typography.Text>
      </code>
    </pre>
  );
  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100°C</strong>,
    },
  };
  const previewContent = (
    <div style={{ width: '600px' }}>
      <Typography>
        <Title level={2}>相对价格</Title>
        <Paragraph>
          默认显示的值是当前最新价格的相对价格、为什么要使用相对价格、因为浏览器的宽度有限不需要显示从0到最新价格的范围、可以取一定的范围作为相对价格、一般BTC行情会在100U之间进行波动、所以可以刻度范围可以取100即可、也可以根据需求来修改。<br />
          举个例子：以100U为单位。取中间值进行初始化、比如当前最新成交价为10000、则默认刻度显示为100/2=50。50则是相当于10000、计划委托则在此基础上相加或者相减。<br />
          如果计划委托的价格是10010、则在刻度上显示的应该是(100/2)+(10010-10000)=60U
        </Paragraph>
      </Typography>
    </div>
  );

  return (
    params.symbol == ":symbol" ? <PageContainer>
      <Table<API.Position> loading={loading} columns={columns} dataSource={positions} />
    </PageContainer> : <PageContainer
      title={params.symbol.toUpperCase()}
      extra={action}
      className={styles.pageHeader}
      tabActiveKey={params.direction}
      onTabChange={(key) => {
        props.history.push(`/operator/${params.platform}/${params.symbol}/${params.contractType}/${key}/${params.type}`, { record: props.location.state.record });
      }}
      tabList={[
        {
          key: 'buy',
          tab: 'Buy',
        },
        {
          key: 'sell',
          tab: 'Sell',
        },
      ]}
    >
        <Tabs
          defaultActiveKey={params.type} onChange={(key) => {
            props.history.push(`/operator/${params.platform}/${params.symbol}/${params.contractType}/${params.direction}/${key}`, { record: props.location.state.record });
          }}>
          <TabPane
            tab="Open"
            key="open"
          >
            <Card>
              <Typography.Text strong>
                <Row>
                  <Col flex={1}>
                    (START/STOP){' '}<Switch loading={false} defaultChecked />{' '}Engine
              </Col>
                  <Col>
                    <Badge status="processing" text="Running" />
                  </Col>
                </Row>
              </Typography.Text>
              <Divider></Divider>
              <Typography.Text strong>
                <Row>
                  <Col flex={1}>Preview <Popover content={previewContent} title="帮助说明" trigger="click"><QuestionCircleOutlined style={{ color: '#eb2f96' }} /></Popover></Col>
                  <Col><SettingOutlined style={{ color: '#eb2f96' }} /></Col>
                </Row>
                <Slider onChange={(value) => {
                  console.log(value);
                }} range marks={marks} defaultValue={[26, 37]} />
              </Typography.Text>
              <Typography.Text strong>
                Rebound{' '}
                <Slider onChange={(value) => {
                  console.log(value);
                }} min={0} marks={{ 0: '0U', 100: '100U' }} defaultValue={10} />
              </Typography.Text>
              <Typography.Text strong>
                Spread{' '}
                <Slider onChange={(value) => {
                  console.log(value);
                }} min={0} marks={{ 0: '0U', 100: '100U' }} defaultValue={50} />
              </Typography.Text>
              <Typography.Text strong>
                ETimeout{' '}
                <Slider onChange={(value) => {
                  console.log(value);
                }} min={0} max={60} marks={{ 0: '0Sec', 60: '60Sec' }} defaultValue={3} />
              </Typography.Text>
              <Typography.Text strong>
                Scheduling{' '}
                <Slider onChange={(value) => {
                  console.log(value);
                }} min={0} max={60} marks={{ 0: '0Sec', 60: '60Sec' }} defaultValue={3} />
              </Typography.Text>
              <Typography.Text strong>
                LeverRate{' '}
                <Slider onChange={(value) => {
                  console.log(value);
                }} min={1} max={125} included={false} step={null} marks={{ 1: '1', 2: '2', 3: '3', 5: '5X', 10: '10X', 20: '20X', 30: '30X', 50: '50X', 75: '75X', 100: '100X', 125: '125X' }} defaultValue={20} />
              </Typography.Text>
            </Card>
          </TabPane>
          <TabPane
            tab="Close"
            key="close"
          >
            Close
    </TabPane>
          <TabPane
            tab="Entrust"
            key="entrust"
          >
            Entrust
    </TabPane>
          <TabPane
            tab="Position"
            key="position"
          >
            Position
    </TabPane>
        </Tabs>
      </PageContainer>
  );

};

export default TableList;
