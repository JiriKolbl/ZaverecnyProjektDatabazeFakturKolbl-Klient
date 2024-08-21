export const InvoiceStatistic = ({statistic}) => {


    return (
        <div>
            <h4>Statistiky faktur: </h4>
            <hr />
            <table className="table mt-2">
                <tbody>
                    <tr>
                        <th scope="row"><strong>Celkový letošní součet cen: </strong></th>
                        <td>{statistic.currentYearSum}</td>
                    </tr>
                    <tr>
                        <th scope="row"><strong>Celkový součet cen: </strong></th>
                        <td>{statistic.allTimeSum}</td>
                    </tr>
                    <tr>
                        <th scope="row"><strong>Počet faktur v databázi: </strong></th>
                        <td>{statistic.invoicesCount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};