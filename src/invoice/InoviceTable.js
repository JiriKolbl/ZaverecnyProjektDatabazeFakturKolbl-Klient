import React from "react";
import { Link } from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";

const InvoiceTable = ({ label, items, deleteInvoice }) => {
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Číslo faktury</th>
                        <th>Splatnost</th>
                        <th>Cena</th>
                        <th>Produkt</th>
                        <th>Dodavatel</th>
                        <th>Odběratel</th>
                        <th colSpan={3}>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.invoiceNumber}</td>
                            <td>{dateStringFormatter(item.dueDate, true)}</td>
                            <td>{item.price}</td>
                            <td>{item.product}</td>
                            <td>
                                <Link to={`/persons/show/${item.seller._id}`} className="custom-link">
                                    {item.seller.name}
                                </Link>
                            </td>
                            <td>
                            <Link to={`/persons/show/${item.buyer._id}`} className="custom-link">
                                    {item.buyer.name}
                                </Link>
                            </td>
                            <td>
                                <div className="btn-group">
                                    <Link
                                        to={"/invoices/show/" + item._id}
                                        className="btn btn-sm btn-info"
                                    >
                                        Zobrazit
                                    </Link>
                                    <Link
                                        to={"/invoices/edit/" + item._id}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Upravit
                                    </Link>
                                    <button
                                        onClick={() => deleteInvoice(item._id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Odstranit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
        </div>
    );
};

export default InvoiceTable;