import React from 'react';
import { NavBar, Footer, Button } from "components";
import { Button as btn } from '@material-ui/core'
import { colors } from "theme";
import { Grid, List, ListItem, Table, TableBody, TableRow, TableCell, TableHead } from "@material-ui/core";
import { isIE } from 'react-device-detect';
import './index.css'
import {
    Link
} from "react-router-dom";
import { processPrice } from '../../../../Redux/service'



const OrderTable = ({ data, headers, type, showHeader, total, id, download, order }) => {


    let itemGroupSm = (data, total, order) => {
        let dRow = 0;
        let cRow = 0;

        console.log("data", data);

        data.forEach((item) => {

            if (item.shipment_method_id === 1) dRow++;
            if (item.shipment_method_id === 2) cRow++;
        })

        return (
            <>
                {
                    cRow !== 0 ?
                        <Grid container className="row-order-table">
                            <Grid item xs={12} className="row-reheight" colSpan={8} style={{ paddingTop: "0.8rem" }}>
                                For Collection
                            </Grid>
                        </Grid> : <></>
                }
                {data.map((item, i) => (
                    <>
                        {
                            item.shipment_method_id === 2 ? (
                                <Grid container>
                                    <Grid item xs={12}>

                                        {ItemSM(item, i)}
                                    </Grid>
                                </Grid>) : (<></>)
                        }
                    </>
                ))
                }
                {
                    dRow !== 0 ? <Grid container className="row-order-table">
                        <Grid tem xs={12} className="row-reheight" colSpan={8} style={{ paddingTop: "0.8rem" }}>
                            For Delivery
                            </Grid>
                    </Grid> : <></>
                }
                {data.map((item, i) => (
                    <>
                        {
                            item.shipment_method_id === 1 ? (
                                <Grid container>
                                    <Grid item xs={12}>

                                        {ItemSM(item, i)}
                                    </Grid>
                                </Grid>) : (<></>)
                        }
                    </>
                ))
                }
                <Grid container style={{ backgroundColor: "#f4f4f4", padding: 10 }}>
                    <Grid item xs={6}>
                        <strong className="color-text-yamaha">
                            Total
                                </strong>
                    </Grid>
                    <Grid item xs={6}>
                        <strong className="color-text-yamaha">
                            {order?.voucher_discount !== "R 0.00" ?
                                <>

                                    <div style={{ fontSize: 12, textAlign: "right" }}>- {order?.voucher_discount}</div>
                                </>
                                :
                                <></>}
                            {

                                <>
                                    <div style={{ fontSize: 15, textAlign: "right" }}>
                                        {total}
                                    </div>
                                </>
                            }
                        </strong>
                    </Grid>
                </Grid>


            </>
        )
    }

    let ItemSM = (item, i) => {
        return (<>
            <Grid container>
                <Grid item xs={5} sm={5}>

                    <img
                        src={item.imageUrl}
                        className="icon-img"
                        alt="img"
                        style={{ width: "100px", height: "60px", marginRight: 10 }}
                    />
                </Grid>
                <Grid item xs={7} sm={7} style={{ color: "black" }}>
                    <p>{item.itemName}</p>
                    <p>{item.price}</p>
                    <p>
                        {item.size ? item.size : "-"}
                    </p>
                    <p>
                        {item.collections?.text}
                    </p>
                    <p>{item.color}</p>
                    <Button title="DOWNLOAD TAX INVOICE" type="primary float-right-btn" onClick={() => {
                        console.log('1')
                        download(id, "1")
                    }}>
                    </Button>
                </Grid>
            </Grid>
            <br />
        </>
        )
    }



    let dRow = 0;
    let cRow = 0;


    data.forEach(item => {
        if (item.shipment_method_id === 1) cRow++;
        if (item.shipment_method_id === 2) dRow++;
    })


    //console.log("data from table", data, "\ndrow", dRow, "\ncRow", cRow);

    return (
        <Grid container>
            <Grid md={12} className="medium-layout">
                <Table>
                    <TableHead>

                        <TableRow>
                            <TableCell colspan={3}>ITEMS</TableCell>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell align="center" colSpan={1}>SIZE</TableCell>
                            <TableCell align="center" colSpan={1}>COLOR</TableCell>
                            <TableCell align="center" colSpan={1}>QUANTITY</TableCell>
                            <TableCell align="right" colSpan={1}>PRICE</TableCell>
                            <TableCell align="right" colSpan={1}>
                                Invoice
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            cRow !== 0 ? <TableRow className="row-order-table">
                                <TableCell className="row-reheight" colSpan={10}>
                                    For Delivery
                            </TableCell>
                            </TableRow> : <></>
                        }

                        {data.map((item, i) => (

                            <TableRow key={`row-${i}`}>
                                {item.shipment_method_id === 1 ? <>
                                    <TableCell colSpan={3}>
                                        <Grid container xs={12} md={12}>
                                            <Grid item xs={3} md={3}>

                                                <img
                                                    src={item.imageUrl}
                                                    className="icon-img"
                                                    alt="img"
                                                    style={{ width: "80px", height: "60px", marginRight: 10 }}
                                                /></Grid>
                                            <Grid item xs={9} md={9} style={{ paddingTop: 20, paddingLeft: 10 }}>{item.itemName}</Grid>

                                        </Grid>
                                    </TableCell>
                                    <TableCell colSpan={2}>

                                    </TableCell>
                                    <TableCell align="center" colSpan={1}>
                                        {item.size ? item.size : "-"}
                                    </TableCell>
                                    <TableCell align="center" colSpan={1}>
                                        {item.color ? item.color : '-'}

                                    </TableCell>
                                    <TableCell align="center" colSpan={1}>
                                        <span>{item.quantity}</span>

                                    </TableCell>
                                    <TableCell align="right" colSpan={1}>
                                        {item.price}
                                    </TableCell>
                                    <TableCell align="center" colSpan={1}>
                                        <Button title="DOWNLOAD TAX INVOICE" type="primary float-right-btn" onClick={() => {
                                            console.log('1')
                                            download(id, "1")
                                        }}>
                                        </Button>
                                    </TableCell>
                                </> : <></>}

                            </TableRow>
                        ))}
                        {
                            dRow !== 0 ? <TableRow className="row-order-table">
                                <TableCell className="row-reheight" colSpan={dRow.length > 0 ? 9 : 10}>
                                    For Collection
                            </TableCell>
                                {dRow.length > 0 ? <TableCell className="row-reheight text-align-right" ><Link style={{ color: "white" }} to="">Track Order</Link></TableCell> : <></>}

                            </TableRow> : <></>
                        }
                        {data.map((item, i) => (

                            <TableRow key={`row-${i}`}>
                                {item.shipment_method_id === 2 ? <>
                                    <TableCell colSpan={3}>
                                        <Grid container xs={12} md={12}>
                                            <Grid item xs={3} md={3}>

                                                <img
                                                    src={item.imageUrl}
                                                    className="icon-img"
                                                    alt="img"
                                                    style={{ width: "80px", height: "60px", marginRight: 10 }}
                                                /></Grid>
                                            <Grid item xs={9} md={9} style={{ paddingTop: 20, paddingLeft: 10 }}>{item.itemName}</Grid>

                                        </Grid>
                                    </TableCell>
                                    <TableCell colSpan={2}>

                                    </TableCell>
                                    <TableCell align="center" colSpan={1}>
                                        {item.size ? item.size : "-"}
                                    </TableCell>
                                    <TableCell align="center" colSpan={1}>
                                        {item.color ? item.color : '-'}

                                    </TableCell>
                                    <TableCell align="center" colSpan={1}>
                                        <span>{item.quantity}</span>

                                    </TableCell>
                                    <TableCell align="right" colSpan={1}>
                                        {item.price}
                                    </TableCell>
                                    <TableCell align="center" colSpan={1}>
                                        <Button title="DOWNLOAD TAX INVOICE" type="primary float-right-btn" onClick={() => {
                                            console.log('1')
                                            download(id, "1")
                                        }}>
                                        </Button>
                                    </TableCell>
                                </> : <></>}

                            </TableRow>
                        ))}


                        {total ? (
                            <TableRow className="total-row">
                                <TableCell colSpan={8}>
                                    <strong className="color-text-yamaha">Total</strong>
                                </TableCell>
                                <TableCell className="text-align-right">
                                    {order?.voucher_discount !== "R 0.00" ?
                                        <>

                                            <div style={{ fontSize: 12, textAlign: "right" }}>- {order?.voucher_discount}</div>
                                        </>
                                        :
                                        <></>}
                                    <strong className="color-text-yamaha">

                                        {total}</strong>
                                </TableCell>
                                <TableCell></TableCell>

                            </TableRow>
                        ) : (<></>)
                        }
                    </TableBody>
                </Table>
            </Grid>
            <Grid item xs={12} className="device-layout">
                {itemGroupSm(data, total, order)}
            </Grid>
        </Grid>
    );

}
export default OrderTable
