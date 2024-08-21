import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import InputSelect from "../components/InputSelect";
import FlashMessage from "../components/FlashMessage";
import { Loading } from "../components/Loading";


const InvoiceForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [persons, setPersons] = useState([])
    const [invoice, setInvoice] = useState({
        invoiceNumber: 0,
        seller: {
            _id: 1
        },
        buyer: {
            _id: 1
        },
        issued: "",
        dueDate: "",
        product: "",
        price: 0,
        vat: 0,
        note: ""
    });

    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
    }, [id]);

    useEffect(() => {
        setLoading(true);
        apiGet("/api/persons")
            .then(data => {
                setPersons(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Nepodařilo se načíst osobu: ", err);
                setLoading(false);
            });
    }, []);

    if(loading) {
        return <Loading />
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const transformedInvoice = {
            ...invoice,
            seller: { _id: invoice.seller.id },
            buyer: { _id: invoice.buyer.id }
        };


        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    }

    const sent = sentState;
    const success = successState;

    return (
        <div className="mt-5">
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr />
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>

                <InputField
                    required={true}
                    type="number"
                    name="invoiceNumber"
                    min="3"
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, invoiceNumber: parseInt(e.target.value) });
                    }}
                />

                <InputSelect
                    required={true}
                    label="Vyberte dodavatele"
                    name="seller"
                    items={persons}
                    handleChange={(e) => setInvoice({ ...invoice, seller: { _id: e.target.value } })}
                    value={invoice.seller.id}
                    prompt="Vyberte dodavatele"
                    objectItems={true}
                    multiple={false}
                />

                <InputSelect
                    required={true}
                    label="Vyberte odběratele"
                    name="buyer"
                    items={persons}
                    handleChange={(e) => setInvoice({ ...invoice, buyer: { _id: e.target.value } })}
                    value={invoice.buyer.id}
                    prompt="Vyberte odběratele"
                    objectItems={true}
                    multiple={false}
                />
                <InputField 
                    required={true}
                    type="date"
                    name="issued"
                    min={new Date().toISOString().slice(0, 10)}
                    label="Datum vystavení"
                    prompt="Zadejte datum vystavení"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, issued: e.target.value });
                    }}
                />

                <InputField 
                    required={true}
                    type="date"
                    name="dueDate"
                    min={new Date().toISOString().slice(0, 10)}
                    label="Datum splatnosti"
                    prompt="Zadejte datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, dueDate: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Produkt"
                    prompt="Zadejte produkt"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, product: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    min="0"
                    label="Cena"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, price: parseInt(e.target.value) });
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    min="0"
                    label="DPH"
                    prompt="Zadejte DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, vat: parseInt(e.target.value) });
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, note: e.target.value });
                    }}
                />
                <input type="submit" className="btn btn-primary" value="Uložit" />
            </form>

        </div>
    )

};

export default InvoiceForm;