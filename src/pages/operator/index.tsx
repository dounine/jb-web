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
  }, [params.platform, params.symbol, params.contractType]);

  const contractTypeOnChange = (e) => {
    props.history.push('/operator/' + params.platform + '/' + params.symbol + '/' + e.target.value, { record: props.location.state.record });
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
              <Link to={{ pathname: `/operator/${params.platform}/${record.name}/${record.contractTypes[0]}`, state: { record } }}>Operator</Link>
            </Space>
          );
        }
        return (<Space size="middle"></Space>);
      },
    },
  ];

  return (
    params.symbol == ":symbol" ? <PageContainer>
      <Table<API.Position> loading={loading} columns={columns} dataSource={positions} />
    </PageContainer> : <PageContainer
      title={params.symbol.toUpperCase()}
      extra={action}
      className={styles.pageHeader}
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

      </PageContainer>
  );

};

export default TableList;
