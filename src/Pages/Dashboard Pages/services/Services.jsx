import { useState } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";
import { useGetServicesQuery } from "../../../api/servicesSlice";

const Services = () => {
  const { data, isLoading, error } = useGetServicesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  console.log("API Response:", data);

  const services = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
    ? data.products
    : [];

  const totalPages = Math.ceil(services.length / itemsPerPage);

  const paginatedServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="كل الكبونات" icon="fa fa-cogs" />
          </div>
          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="p-3">
                  <h3 className="latest_users mt-2 mb-3 text-center">
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>
                    كل المنتجات
                    <i
                      className="fa fa-angle-double-right"
                      aria-hidden="true"
                    ></i>
                    <hr />
                  </h3>
                  <div className="table-responsive">
                    {isLoading ? (
                      <div className="center-loader">
                        <div className="loader"></div>
                      </div>
                    ) : error ? (
                      <div className="text-danger text-center">
                        Error loading services
                      </div>
                    ) : services.length === 0 ? (
                      <div className="text-center">لا يوجد بيانات</div>
                    ) : (
                      <>
                        <table className="table">
                          <tbody>
                            {paginatedServices.map((product, index) => (
                              <tr key={product.id || index}>
                                <td>
                                  {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>
                                <td>{product.name}</td>
                                <td
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      product.short_description ||
                                      product.description ||
                                      "",
                                  }}
                                ></td>
                                <td>
                                  {product.prices?.price}{" "}
                                  {product.prices?.currency_symbol}
                                </td>
                                <td>
                                  {product.images?.length > 0 && (
                                    <img
                                      src={product.images[0].src}
                                      alt={product.name}
                                      style={{
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  )}
                                </td>
                                <td>
                                  <a
                                    href={`https://camion-six.vercel.app/en/shop/${product.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn"
                                    style={{
                                      background: "#b3261e",
                                      color: "#fff",
                                    }}
                                  >
                                    View Product
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="d-flex justify-content-center mt-3">
                          <nav>
                            <ul className="pagination">
                              <li
                                style={{
                                  cursor: "pointer",
                                }}
                                className={`page-item ${
                                  currentPage === 1 ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePageChange(currentPage - 1)
                                  }
                                >
                                  السابق
                                </button>
                              </li>

                              {Array.from({ length: totalPages }, (_, i) => (
                                <li
                                  style={{
                                    background: "#b3261e",
                                    cursor: "pointer",
                                  }}
                                  key={i}
                                  className={`page-item ${
                                    currentPage === i + 1 ? "active" : ""
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => handlePageChange(i + 1)}
                                  >
                                    {i + 1}
                                  </button>
                                </li>
                              ))}

                              <li
                                style={{
                                  cursor: "pointer",
                                }}
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePageChange(currentPage + 1)
                                  }
                                >
                                  التالي
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
