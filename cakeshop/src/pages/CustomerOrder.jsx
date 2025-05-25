import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import OrderTable from "../components/customerOrderPage/OrderTable";
import OrderList from "../components/customerOrderPage/OrderList";
import CustomerOrderDetail from "../components/customerOrderPage/CustomerOrderDetail";

import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import OrderContext from "../contexts/OrderProvider";
import { useParams } from "react-router-dom";

export default function CustomerOrder() {
  const { users } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);
  const { selectedOrderId } = useParams();

  const [order, setOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");

  const usersWithOrders = users.filter((user) =>
    orders.some((order) => order.userId === user.id)
  );

  const rows = orders
    .filter((order) => order.orderStatus !== "Completed") // dont show complete 
    .map((order) => {
      const user = users.find((user) => user.id === order.userId);
      return {
        id: order.id,
        date: new Date(order.createdDate).toLocaleString("en-NZ", {
          timeZone: "Pacific/Auckland",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        customer: {
          initial: user.username.charAt(0).toUpperCase(),
          name: user.username,
          email: user.email,
        },
      };
    });

  // Filter orders
  const filteredRows = rows.filter((row) => {
    const statusMatch = orderStatusFilter
      ? row.orderStatus === orderStatusFilter
      : true;
    const paymentMatch = paymentStatusFilter
      ? paymentStatusFilter === "paid"
        ? row.paymentStatus
        : !row.paymentStatus
      : true;
    const customerMatch = customerFilter
      ? row.customer.name === customerFilter
      : true;
    const searchMatch = searchTerm
      ? Object.values(row).some((field) =>
          String(field).toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        Object.values(row.customer).some((field) =>
          String(field).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;
    return statusMatch && paymentMatch && customerMatch && searchMatch;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredRows.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredRows.length / ordersPerPage);

  return (
    <div className="mx-auto mt-1 mb-15 max-w-7xl">
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100dvh" }}>
          <Box
            component="main"
            className="MainContent"
            sx={{
              px: { xs: 2, md: 6 },
              pt: {
                xs: "calc(12px + var(--Header-height))",
                sm: "calc(12px + var(--Header-height))",
                md: 3,
              },
              pb: { xs: 2, sm: 2, md: 3 },
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              height: "100dvh",
              gap: 1,
            }}
          >
            {/* Breadcrumbs */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={<ChevronRightRoundedIcon fontSize="sm" />}
                sx={{ pl: 0 }}
              >
                <Link
                  underline="none"
                  color="neutral"
                  href="/"
                  aria-label="Home"
                >
                  <HomeRoundedIcon />
                </Link>
                {selectedOrderId && (
                  <Link
                    underline="none"
                    color="primary"
                    href="/customer-orders"
                    aria-label="Orders"
                  >
                    Orders
                  </Link>
                )}
                <Typography
                  color="primary"
                  sx={{ fontWeight: 500, fontSize: 12 }}
                >
                  {selectedOrderId ? "Order Details" : "Orders"}
                </Typography>
              </Breadcrumbs>
            </Box>

            {/* Title */}
            <Box
              sx={{
                display: "flex",
                mb: 1,
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "start", sm: "center" },
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Typography level="h2" component="h1">
                {selectedOrderId ? "Order Details" : "Orders"}
              </Typography>
            </Box>

            {/* Conditional Rendering */}
            {rows.length === 0 ? (
              <Typography level="body-md" sx={{ textAlign: "center", mt: 4 }}>
                No orders found
              </Typography>
            ) : selectedOrderId ? (
              <CustomerOrderDetail selectedOrderId={selectedOrderId} />
            ) : (
              <>
                <OrderTable
                  currentOrders={currentOrders}
                  totalPages={totalPages}
                  usersWithOrders={usersWithOrders}
                  indexOfFirstOrder={indexOfFirstOrder}
                  setSearchTerm={setSearchTerm}
                  setOrderStatusFilter={setOrderStatusFilter}
                  setPaymentStatusFilter={setPaymentStatusFilter}
                  setCustomerFilter={setCustomerFilter}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  ordersPerPage={ordersPerPage}
                  order={order}
                  setOrder={setOrder}
                />
                <OrderList
                  currentOrders={currentOrders}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </Box>
        </Box>
      </CssVarsProvider>
    </div>
  );
}
