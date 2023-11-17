//react component
// app related
import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CatalogContext} from '../../context/CatalogContext';

// material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import {ListItem, MenuItem} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../redux/actions/categoryActions";
import {createCatalog, getCatalogInfo, getProductsBasedOnCategoryId} from "../../redux/actions/catalogActions";
import {SET_CATEGORY_ID, SET_SELECTED_PRODUCTS_LIST, SET_UNSELECTED_PRODUCT_LIST} from "../../redux/types";
import {isArrayNotEmpty, isStringNullorEmpty} from "../../util/appUtils/CommonUtils";
import {SnackBar} from "../SnackBar";


const useStyles = makeStyles((theme) =>
({
    ".MuiFormHelperText-root": {
        color: "red",
        fontFamily: "'Fira Sans', sans-serif",
    },
    root: {
        margin: "auto"
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
        boxShadow: "0px 4px 80px grey"
    },
    list: {
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",
        marginTop: 4
    },
    collapse: {
        "& .MuiCollapse-wrapperInner": {
            display: "flex",
            flexDirection: "column"
        }
    },
    button: {
        margin: theme.spacing(0.5, 0)
    },
    root1: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "20px"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    transferGrid : {
        margin: 0,
        boxSizing: "border-box",
        width: "42%"
}
})
);


export const AddCatalog = (props) => {

    const [initialCatalogObj, setInitialCatalogObj] =  useState(useContext(CatalogContext));

    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [errors, setErrors] = useState({});

    const [catalogName, setCatalogName] = useState("");
    const { categoryList } = useSelector((state) => state.Category);
    const { productsList  , selectedProductsList , allProductsList ,selectedCategoryId} = useSelector((state) => state.Catalog);
    const dispatch = useDispatch();

    //////

    const not = (a, b) =>  {
        let newArray = a.filter((aObj) =>  !b.some((bObj) => aObj.id === bObj.id ));
        return newArray;
    }

    const intersection = (a, b) =>  {
        let newArray =  a.filter((aObj) =>  b.some((bObj) => aObj.id === bObj.id ));
        return newArray;
    };

    const union = (a, b)  => {
        let newArray =  [...a, ...not(b, a)];
        return newArray;
    };

    const leftChecked = intersection(checked, productsList);
    const rightChecked = intersection(checked, selectedProductsList);

    const handleToggle = (product) => () => {
        const currentIndex =  checked.findIndex((item) => item.id === product.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(product);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => {
       return  intersection(checked, items).length;
    };


    const handleToggleAll = (items) => () => {
        let checkedCount = numberOfChecked(items);
        if (checkedCount === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };


    const setRight = (value) => {
        dispatch({type : SET_SELECTED_PRODUCTS_LIST , payload : value});
    };

    const setLeft= (value) => {
        dispatch({type : SET_UNSELECTED_PRODUCT_LIST , payload : value});
    };

    const handleCheckedRight = () => {
        setRight(selectedProductsList.concat(leftChecked));
        setLeft(not(productsList , leftChecked ));
        setChecked(not(checked , leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(productsList.concat(rightChecked));
        setRight(not(selectedProductsList , rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleSwap = () => {
        setRight(productsList);
        setLeft(selectedProductsList);
    };

    const handleSortClick = (
        event,
        items,
        side
    ) => {
        const copyItems = [...items].sort((a, b) => a.id - b.id);
        if (side === "right") {
            setRight(copyItems);
        } else {
            setLeft(copyItems);
        }
    };

    //// end of transfer list methods


    const inputValidation = () => {
        let errors = {};
        let inputsValid = true;

        if (!catalogName) {
            inputsValid = false;
            errors["catalogName"] = "Catalog Name is Required";
        }

        if(!selectedCategoryId || selectedCategoryId == 0) {
            inputsValid = false;
            errors["categoryId"] = "Please select Category";
        }

        if(!isArrayNotEmpty(selectedProductsList)) {
            inputsValid = false;
            errors["selectedProducts"] = "Please select products";
        }

        setErrors(errors);
        return inputsValid;
    };

    useEffect( () => {
        if (Object.keys(initialCatalogObj).length > 0) {
            dispatch(getCatalogInfo(initialCatalogObj.code));
            setCatalogName(initialCatalogObj.code);
        }
        dispatch(getCategories());
    }, []);


    useEffect(() => {
        if(selectedCategoryId > 0) {
            dispatch(getProductsBasedOnCategoryId(selectedCategoryId));
        }
    }, [selectedCategoryId]);



    const handleCategoryChange = (event) => {
        dispatch({type : SET_CATEGORY_ID , payload : +event.target.value});
    };

    const submitAddCatalog = () => {

        if(inputValidation()) {
            let productIds = selectedProductsList.map(product => product.id);
            const catalogRequest = {
                catalogCode : catalogName ,
                categoryId : "" + selectedCategoryId,
                productIds : productIds
            };

                let method = "post";
                if(Object.keys(initialCatalogObj).length > 0) {
                    method = "put";
                }
                dispatch(createCatalog(catalogRequest,method));
                resetScreen();

        }
    };

    const resetScreen = () =>  {

        dispatch({ type : SET_CATEGORY_ID , payload : 0 });
        dispatch({ type : SET_SELECTED_PRODUCTS_LIST , payload : [] });
        dispatch({ type : SET_UNSELECTED_PRODUCT_LIST , payload : [] });
        setCatalogName("");
        setInitialCatalogObj({});

    };


    // list for the transfer list

    const CardSelector = (
        title,
        items,
        side
    ) => {
        const [expanded, setExpanded] = useState(true);

        const handleExpandClick = () => {
            setExpanded(!expanded);
        };

        return (
            <Card
                id= "cardId"
                style={{ display: "flex", flexDirection: "column" }}
                component={Paper}
            >
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                        <Checkbox
                            onClick={handleToggleAll(items)}
                            checked={
                                items &&
                                numberOfChecked(items) === items.length && items.length !== 0
                            }
                            indeterminate={
                                items &&
                                numberOfChecked(items) !== items.length &&
                                numberOfChecked(items) !== 0
                            }
                            disabled={items && items.length === 0}
                            inputProps={{ "aria-label": "all items selected" }}
                        />
                    }
                    title={title}
                    subheader={`${numberOfChecked(items)}/${ items ? items.length : 0} selected`}
                    action={
                        <IconButton
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    }
                />
                <Collapse in={expanded} className={classes.collapse}>
                    <List className={classes.list} dense component="div" role="list">
                        {
                            items  &&
                            items.length > 0 &&
                            items.map((product) => {
                            const labelId = `transfer-list-all-item-${product.id}-label`;

                            return (
                                <ListItem
                                    key={product.id}
                                    role="listitem"
                                    button
                                    sx = {{
                                            paddingLeft: "0px",
                                            paddingRight: "58px"
                                        }}
                                    onClick={handleToggle(product)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={checked.findIndex(item => item.id === product.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ "aria-labelledby": labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        id={labelId}
                                        primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                        sx = {{ fontsize : "8px" , textOverflow : "ellipsis"}}
                                        primary={product.description.title}
                                    />
                                </ListItem>
                            );
                        })}
                        <ListItem />
                    </List>
                    <Button
                        variant="outlined"
                        style={{ margin: 12 }}
                        onClick={(e) => handleSortClick(e, items, side)}
                    >
                        Sort
                    </Button>
                </Collapse>
            </Card>
        );
    };


    return (
        <>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={3}>

                    <TextField
                        id="catalogName"
                        label="Catalog Name"
                        variant="outlined"
                        align="left"
                        size="small"
                        disabled={Object.keys(initialCatalogObj).length > 0 && !isStringNullorEmpty(catalogName)}
                        value={catalogName}
                        onChange={(e) => setCatalogName(e.target.value)}
                        InputLabelProps={{
                            classes: {
                                root: classes.labelRoot,
                            },
                        }}
                    />
                    <p  style= {{color : "red"}} >{errors.catalogName ? errors.catalogName : ""}</p>

                    <Divider />

                    <form className={classes.root1} autoComplete="off">
                        <TextField
                            select
                            variant="outlined"
                            label="Select Category"
                            value={selectedCategoryId}
                            onChange={handleCategoryChange}
                            disabled = {Object.keys(initialCatalogObj).length > 0 && selectedCategoryId > 0}
                            style={{ width: 400 }}
                            inputProps={{  id: "outlined-age-simple" }}
                        >
                            <MenuItem value={0}>
                                <em></em>
                            </MenuItem>

                            {
                                Object.keys(categoryList).length > 0 &&
                                categoryList.categories.length > 0 ? (
                                    categoryList.categories.map((category) => (
                                        <MenuItem  key={category.id} value={category.id}>
                                            {category.code}
                                        </MenuItem>

                                    ))
                                ) : (
                                   <h1 style={{ display :'none' }} > </h1>
                                )
                            }

                        </TextField>
                        <p style= {{color : "red"}} >{errors.categoryId ? errors.categoryId : ""}</p>
                    </form>

                    <CardActions>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={submitAddCatalog}
                            size="large" >
                            Add Catalog
                        </Button>
                    </CardActions>

                </Grid>

                <Grid item xs={9}>
                    <p style= {{color : "red"}} > {errors.selectedProducts ? errors.selectedProducts : "" }</p>

                    <Grid
                        container
                        spacing={2}
                        justify="center"
                        alignItems="center"
                        className={classes.root}
                    >
                        <Grid  item id="gridId" className={classes.transferGrid}>
                            <Paper elevation={3}>{CardSelector("Choices", productsList, "left")}</Paper>
                        </Grid>
                        <Grid item>

                            <Grid container direction="column" alignItems="center" style={{ width : "16%"}}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedRight}
                                    disabled={leftChecked.length === 0}
                                    aria-label="move selected right"
                                >
                                    &gt;
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleCheckedLeft}
                                    disabled={rightChecked.length === 0}
                                    aria-label="move selected left"
                                >
                                    &lt;
                                </Button>
                               {/* <Button
                                    variant="outlined"
                                    size="small"
                                    className={classes.button}
                                    onClick={handleSwap}
                                >
                                    <SwapHorizIcon></SwapHorizIcon>
                                </Button>*/}
                            </Grid>
                        </Grid>
                        <Grid item  className={classes.transferGrid} >
                            <Paper elevation={3}>{CardSelector("Chosen", selectedProductsList, "right")}</Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <SnackBar/>
            </Grid>
        </>
    );

};