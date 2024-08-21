import React, { useEffect, useState } from "react";
import { UNSAFE_DataRouterStateContext, useParams } from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";
import { Link } from "react-router-dom";

import { apiGet } from "../utils/api";
import { Loading } from "../components/Loading";
//import Country from "./Country";

const InvoiceDetail = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        apiGet("/api/invoices/" + id)
            .then(data => {
                setInvoice(data);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                setLoading(false);
                setError(err.message)
            });
    }, [id]);

    if (loading) {
        return <Loading />
    }

    if (errorState) {
        return <div className="container mt-5">
            <div className="alert alert-danger">
                {errorState}
            </div>
        </div>;
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <h1>Detail Faktury</h1>
                    <hr />
                    <h3>Číslo faktury: <strong>{invoice.invoiceNumber}</strong></h3>
                    <div className="col-6">
                        <br />
                        <p>
                            <strong>Splatnost:</strong>
                            <br />
                            {dateStringFormatter(invoice.dueDate, true)}
                        </p>
                        <p>
                            <strong>Vydané:</strong>
                            <br />
                            {dateStringFormatter(invoice.issued, true)}
                        </p>
                        <p>
                            <strong>Produkt: </strong>
                            <br />
                            {invoice.product}
                        </p>
                        <p>
                            <strong>Cena: </strong>
                            <br />
                            {invoice.price}
                        </p>
                        <p>
                            <strong>DPH: </strong>
                            <br />
                            {invoice.vat}
                        </p>
                        <p>
                            <strong>Poznámka: </strong>
                            <br />
                            {invoice.note}
                        </p>
                    </div>
                    <div className="col-6 fs-5">
                        <p>
                            <strong>Dodavatel: </strong>
                            <br />
                            <Link to={`/persons/show/${invoice.seller._id}`} className="custom-link">{invoice.seller ? invoice.seller.name : <Loading />}</Link>
                        </p>
                        <hr />
                        <p>
                            <strong>Odběratel: </strong>
                            <br />
                            <Link to={`/persons/show/${invoice.buyer._id}`} className="custom-link">{invoice.buyer ? invoice.buyer.name : <Loading />}</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvoiceDetail;