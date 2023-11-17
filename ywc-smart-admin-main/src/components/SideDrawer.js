import React from "react";
import { Link } from "react-router-dom";

//material ui
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import CategoryIcon from "@material-ui/icons/Category";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import PaymentIcon from "@material-ui/icons/Payment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import FilterIcon from "@material-ui/icons/Filter";
import Tooltip from "@material-ui/core/Tooltip";
import {LocalOffer} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  list: {
    "& .MuiListItemText-primary": {
      fontFamily: "Montserrat",
      fontSize: 14,
    },
  },
}));

export const SideDrawer = (props) => {
  const classes = useStyles();
  const { open, handleDrawerClose, tabId } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List className={classes.list}>
        <ListItem
          button
          component={Link}
          to="/admin/dashboard"
          selected={tabId === "1"}
        >
          <ListItemIcon>
            <Tooltip title="Dashboard" placement="top">
              <DashboardIcon />
            </Tooltip>
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/category"
          selected={tabId === "2"}
        >
          <ListItemIcon>
            <Tooltip title="Category" placement="top">
              <CategoryIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/groups"
          selected={tabId === "3"}
        >
          <ListItemIcon>
            <Tooltip title="Groups" placement="top">
              <GroupWorkIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/vendors-list"
          selected={tabId === "4"}
        >
          <ListItemIcon>
            <Tooltip title="Vendors" placement="top">
              <PeopleIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Vendors" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/customers-list"
          selected={tabId === "5"}
        >
          <ListItemIcon>
            <Tooltip title="Customers" placement="top">
              <RecentActorsIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/products"
          selected={tabId === "6"}
        >
          <ListItemIcon>
            <Tooltip title="Products" placement="top">
              <LocalMallIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/order-list"
          selected={tabId === "7"}
        >
          <ListItemIcon>
            <Tooltip title="Orders" placement="top">
              <ShoppingCartIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/transactions"
          selected={tabId === "8"}
        >
          <ListItemIcon>
            <Tooltip title="Transactions" placement="top">
              <PaymentIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>

        <ListItem
          button
          component="a"
          href="https://app.shiprocket.in/login"
          target="_blank"
        >
          <ListItemIcon>
            <Tooltip title="Shipping" placement="top">
              <LocalShippingIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Shipping" />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/admin/banners"
          selected={tabId === "11"}
        >
          <ListItemIcon>
            <Tooltip title="Banners" placement="top">
              <FilterIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Banners" />
        </ListItem>


        <ListItem
            button
            component={Link}
            to="/admin/catalog"
            selected={tabId === "12"}
        >
          <ListItemIcon>
            <Tooltip title="Catalog" placement="top">
              <LocalOffer />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Catalog" />
        </ListItem>

      </List>
    </Drawer>
  );
};
