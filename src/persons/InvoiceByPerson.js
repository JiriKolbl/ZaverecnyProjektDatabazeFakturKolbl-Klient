import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const InvoiceByPerson = ({ invoices, counterparty }) => {
    const [description, setDescription] = useState("");

    /*
    Logika rozhodující o tom zda se vyrenderuje do tabulky jako description slovo 'Odběratel' nebo 'Dodavatel' podle toho co vložíme přes props
    */
    useEffect(() => {
        if (counterparty === "seller") {
            setDescription("Dodavatel");
        } else if (counterparty === "buyer") {
            setDescription("Odběratel");
        } else {
            setDescription("Špatně zadáno");
        }
    }, [counterparty]);

    /*
        Vyrenderování tabulky pro výpis faktur vztahujících se ke konkrétní osobě v detailu osoby
    */
    return (
        <>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Číslo faktury</th>
                        <th>Splatnost</th>
                        <th>Cena</th>
                        <th>{description}</th>{/*Zde se vypíše description vybraný podle logiky výše*/}
                        <th>Produkt</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => {
                        let counterpartyPerson;
                        let counterpartyLink;
                        {/*Když counterparty zadaná přes props je seller (značí že person v detailu je tím pádem buyer) vybere se objekt seller jako counterpartyPerson.
                            Důvodem použítí podmínky namísto např. ternárního výrazu je to, že mi dovoluje kontrolovat třetí možnost kdy by programátor špatně zadal hodnotu 
                            counterparty na vstupu. Takže pro debugging. Také by šlo použít vnořený ternární výraz, ale to může být trošku divočina v čitelnosti.*/}
                        if (counterparty === "seller") {
                            counterpartyPerson = invoice.seller;
                            counterpartyLink = (
                                <Link to={`/persons/show/${counterpartyPerson._id}`} className="custom-link">
                                    {counterpartyPerson.name}
                                </Link>
                            );
                        } else if (counterparty === "buyer") {
                            counterpartyPerson = invoice.buyer;
                            counterpartyLink = (
                                <Link to={`/persons/show/${counterpartyPerson._id}`} className="custom-link">
                                    {counterpartyPerson.name}
                                </Link>
                            );
                        } else {
                            counterpartyPerson = null;
                            counterpartyLink = <span>Špatně vložené hodnoty counterparty</span>;
                        }

                        return (
                            <tr key={invoice.invoiceNumber}>
                                <td>
                                    <Link to={`/invoices/show/${invoice._id}`} className="custom-link">
                                        {invoice.invoiceNumber}
                                    </Link>
                                </td>
                                <td>{invoice.dueDate}</td>
                                <td>{invoice.price}</td>
                                <td>{counterpartyLink}</td>
                                <td>{invoice.product}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};