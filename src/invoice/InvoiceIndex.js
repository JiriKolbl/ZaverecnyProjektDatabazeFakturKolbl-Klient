import { useEffect, useState } from "react";
import InvoiceTable from "./InoviceTable";
import { apiGet } from "../utils/api";
import { apiDelete } from "../utils/api";
import { Loading } from "../components/Loading";
import { InvoiceFilter } from "./InvoiceFilter";


const InvoiceIndex = () => {

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [persons, setPersons] = useState([])
    const [filterState, setFilter] = useState({
        sellerID: undefined,
        buyerID: undefined,
        product: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        fromDate: undefined,
        toDate: undefined,
        limit: undefined,
    });

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };


    useEffect(() => {
        setLoading(true);
        apiGet("/api/invoices")
            .then(data => {
                setInvoices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Nepodařilo se načíst faktury: ", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        apiGet("/api/persons")
            .then(data => {
                setPersons(data);
            })
            .catch(err => {
                console.error("Nepodařilo se načíst osoby: ", err);
            });
    }, []);

    const handleChange = (e) => {
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: undefined }
            });
        } else {
            const { name, value } = e.target;
            setFilter(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;

        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };


    if (loading) {
        return <Loading />
    }

    return (
        <div className="mt-5">
            <h1>Seznam faktur</h1>
            <hr />
            <InvoiceFilter
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                persons={persons}
                filter={filterState}
            />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:"
            />
        </div>
    );
};

export default InvoiceIndex;