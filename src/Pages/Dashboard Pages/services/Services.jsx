"use client";

import { useState, useEffect } from "react";
import Header from "../../../Components/Admin Components/header/Header";
import SideNav from "../../../Components/Admin Components/sideNav/SideNav";
import PageHeader from "../../../Components/Common/page header/PageHeader";


export default function AllProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 12; 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://buckydrop.camion-app.com/api/products?page=${currentPage}&per_page=${perPage}`
        );
        const data = await res.json();
        if (data?.products) {
          setProducts(data.products);
          setTotalPages(data.pagination?.totalPages || 1);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  return (
    <div>
      <Header />
      <div className="page-body-wrapper">
        <SideNav />
        <div className="add_user_container">
          <div style={{ marginTop: "30px" }}>
            <PageHeader name="كل المنتجات" icon="fa fa-box" />
          </div>

          <div className="row content-wrapper">
            <div className="col-12 grid-margin">
              <div className="card p-3">
                {loading ? (
                  <div className="text-center">جاري التحميل...</div>
                ) : products.length === 0 ? (
                  <div className="text-center">لا توجد منتجات</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table text-center table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>#</th>
                          <th>الصورة</th>
                          <th>العنوان</th>
                          <th>السعر</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => {
                          const image =
                            product.images?.[0]?.src || "/placeholder.png";
                          const title = product.title || product.name;
                          const price =
                            product.prices?.price_range?.min_amount ||
                            product.prices?.price ||
                            "0";

                          return (
                            <tr key={product.id}>
                              <td>{(currentPage - 1) * perPage + index + 1}</td>
                              <td>
                                <img
                                  src={image}
                                  alt={title}
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                  }}
                                />
                              </td>
                              <td>{title}</td>
                              <td>{price}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center mt-3 gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-[#e14a5c] hover:text-white"
                      >
                        السابق
                      </button>

                      <span className="px-3 py-1 border rounded">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        onClick={() =>
                          setCurrentPage((p) =>
                            Math.min(p + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-[#e14a5c] hover:text-white"
                      >
                        التالي
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
