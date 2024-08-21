/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiGet } from "../utils/api";
import Country from "./Country";

import { Loading } from "../components/Loading";
import { InvoiceByPerson } from "./InvoiceByPerson";

const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [invoicesBySeller, setInvoicesBySeller] = useState([]);
    const [invoicesByBuyer, setInvoicesByBuyer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorState, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        apiGet("/api/persons/" + id)
            .then(data => {
                setPerson(data);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                setLoading(false);
                setError(err.message)
            });
    }, [id]);


    useEffect(() => {
        if (person) {
            setLoading(true);
            apiGet(`/api/identification/${person.identificationNumber}/sales`).then((data) => setInvoicesBySeller(data));
            setLoading(false);
        }
    }, [person]);
    useEffect(() => {
        if (person) {
            setLoading(true);
            apiGet(`/api/identification/${person.identificationNumber}/purchases`).then((data) => setInvoicesByBuyer(data));
            setLoading(false);
        }
    }, [person]);

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

    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        
        <div className="container mt-5">
            <div className="row">
                <h1>Detail osoby</h1>
                <hr />
                <div className="col-6">
                    <h3>{person.name} ({person.identificationNumber})</h3>
                    <p>
                        <strong>DIČ:</strong>
                        <br />
                        {person.taxNumber}
                    </p>
                    <p>
                        <strong>Bankovní účet:</strong>
                        <br />
                        {person.accountNumber}/{person.bankCode} ({person.iban})
                    </p>
                    <p>
                        <strong>Tel.:</strong>
                        <br />
                        {person.telephone}
                    </p>
                    <p>
                        <strong>Mail:</strong>
                        <br />
                        {person.mail}
                    </p>
                    <p>
                        <strong>Sídlo:</strong>
                        <br />
                        {person.street}, {person.city},
                        {person.zip}, {country}
                    </p>
                    <p>
                        <strong>Poznámka:</strong>
                        <br />
                        {person.note}
                    </p>
                </div>
                <div className="col-6">
                    <h6><strong>Faktury přijaté</strong></h6>
                    <hr />
                    <InvoiceByPerson
                        invoices={invoicesByBuyer}
                        counterparty="seller"
                    />
                    <br />
                    <h6><strong>Faktury vystavené</strong></h6>
                    <hr />
                    <InvoiceByPerson
                        invoices={invoicesBySeller}
                        counterparty="buyer"
                    />
                </div>
            </div>
        </div>

    );
};

export default PersonDetail;
