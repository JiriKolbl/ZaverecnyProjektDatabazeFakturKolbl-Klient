import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";

import { InvoiceStatistic } from "./InvoiceStatistic";
import { PersonStatistics } from "./PersonStatistics";
import { Loading } from "../components/Loading";

export function StatisticIndex() {
    const [personStatistics, setPersonStatistics] = useState(null);
    const [invoiceStatistics, setInvoiceStatistics] = useState(null);
    const [visibleComponent, setVisibleComponent] = useState('invoice');

    useEffect(() => {
        apiGet("/api/persons/statistics").then((data) => setPersonStatistics(data));
    }, []);

    useEffect(() => {
        apiGet("/api/invoices/statistics").then((data) => setInvoiceStatistics(data));
    }, []);

    if (!personStatistics || !invoiceStatistics) {
        return <Loading />;
    }

    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-left">
                <button
                    type="button"
                    //${visibleComponent === 'invoice' ? 'active' : ''} nám zajišťuje že pokud je visComp invoice tak je také active (třída boostrap)
                    className={`btn btn-outline-secondary mx-2 statistics-button-size ${visibleComponent === 'invoice' ? 'active' : ''}`}
                    //Na kliknutí nastav visibleComponent jako invoice aby se mohla vyrenderovat invoiceStatistic komponenta
                    onClick={() => setVisibleComponent('invoice')}
                >
                    Statistiky faktur
                </button>
                <button
                    type="button"
                    //${visibleComponent === 'person' ? 'active' : ''} nám zajišťuje že pokud je visComp person tak je také active (třída boostrap)
                    className={`btn btn-outline-secondary mx-2 statistics-button-size ${visibleComponent === 'person' ? 'active' : ''}`}
                    onClick={() => setVisibleComponent('person')}
                >
                    Statistiky osob
                </button>
            </div>
            <div className="container mt-5 d-flex justify-content-left">
                <div className="col-12">
                    {
                    // Toto je podmíněné renderování {Když se splní tato podmínka && jde se sem a zkontroluje se platnost další podmínky atd. atd. && na konci musí být komponenta pro vykreslení}
                    visibleComponent === 'invoice' && <InvoiceStatistic statistic={invoiceStatistics} />}
                    {visibleComponent === 'person' && <PersonStatistics statistics={personStatistics} />}
                </div>
            </div>
        </div>
    );
}