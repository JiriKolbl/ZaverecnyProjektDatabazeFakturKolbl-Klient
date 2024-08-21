import { Link } from "react-router-dom";


export const PersonStatistics = (props) => {
    const { statistics } = props;

    return (
        <div>
            <h4>Statistiky osob: </h4>
            <hr />
            <table className="table mt-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Jméno</th>
                        <th scope="col">Příjmy</th>
                    </tr>
                </thead>
                <tbody>
                    {statistics && statistics.map((statistic, index) => ( 
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td><Link to={`/persons/show/${statistic.personId}`} className="custom-link">{statistic.personName}</Link></td>
                            <td>{statistic.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};