import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FaLongArrowAltRight,
  FaLongArrowAltLeft,
  FaRegUser,
} from "react-icons/fa";

import "antd/dist/antd.css";
import { Pagination } from "antd";

import "./Table.scss";

// const pageSize = 5;

const UsersTable = ({
  tableData,
  headers,
  totalUsers,
  perPage,
  setNewPage,
}) => {
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [minIndex, setMinIndex] = useState(0);

  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <span>
          <FaLongArrowAltLeft />
          Previous
        </span>
      );
    }
    if (type === "next") {
      return (
        <span>
          Next
          <FaLongArrowAltRight />
        </span>
      );
    }
    return originalElement;
  };

  const handleChange = (page) => {
    page !== currentPage && setCurrentPage(page);
    setMinIndex((page - 1) * perPage);
    setMaxIndex(page * perPage);
    console.log("current page", minIndex, maxIndex, page);
    setNewPage(page);
  };

  const fetchUser = (id) => {
    // find array that contains the id
    const user = tableData.find((user) => user.id === id);
    history.push(`/account-management/profile/${user.id}`, {
      user,
    });
  };

  useEffect(() => {
    setData(tableData);
    setTotal(totalUsers / perPage);
    setMaxIndex(perPage);
    setMinIndex(0);
  }, [tableData]);

  return (
    <div className="table_container">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="table-checkbox" />
            </th>
            {headers?.map((name, i) => (
              <th key={name} className="align_left">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody align="right">
          {data?.map((user, i) => {
            const { id, name, email, type, img, date, first_name, last_name } =
              user;
            return (
              i >= minIndex &&
              i < maxIndex && (
                <tr key={id} onClick={() => fetchUser(id)}>
                  <td className="align_left">
                    <input type="checkbox" id={`table-checkbox-${i + 1}`} />
                  </td>
                  <td className="align_left">{id}</td>
                  <td className="align_left">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {img ? (
                        <img
                          style={{
                            borderRadius: "50px",
                            height: "2.5rem",
                            width: "2.5rem",
                            marginRight: ".5rem",
                            border: "1px solid #E0E0E0",
                          }}
                          src={img}
                          alt="user"
                        />
                      ) : (
                        <FaRegUser
                          style={{
                            borderRadius: "50px",
                            height: "2.5rem",
                            width: "2.5rem",
                            marginRight: ".5rem",
                            padding: "0.3rem",
                            border: "1px solid #E0E0E0",
                          }}
                        />
                      )}
                      <span>{name ? name : `${first_name} ${last_name}`}</span>
                    </div>
                  </td>
                  <td className="align_left">{email}</td>
                  <td className="align_left">{type}</td>
                  <td className="align_left">{date}</td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
      <Pagination
        total={totalUsers}
        itemRender={itemRender}
        pageSize={perPage}
        defaultCurrent={currentPage}
        onChange={handleChange}
      />
    </div>
  );
};

export default UsersTable;
