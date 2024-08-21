import React from 'react';
import InputSelect from '../components/InputSelect';
import InputField from '../components/InputField';


export const InvoiceFilter = ({ handleChange, handleSubmit, persons, filter }) => {

    return (
        <form onSubmit={handleSubmit}>
            <h6>Filtruj dle:</h6>
            <div className="row">
                <div className="col-md-3">
                    <InputSelect
                        required={false}
                        name="buyerID"
                        items={persons}
                        handleChange={handleChange}
                        label="Odběratele"
                        prompt="nevybrán"
                        value={filter.buyerID}
                        multiple={false}
                        objectItems={true}
                    />
                </div>
                <div className="col-md-3">
                    <InputSelect
                        required={false}
                        name="sellerID"
                        items={persons}
                        handleChange={handleChange}
                        label="Dodavatele"
                        prompt="nevybrán"
                        value={filter.sellerID}
                        multiple={false}
                        objectItems={true}
                    />
                </div>
                <div className="col-md-3">
                    <InputField
                        required={false}
                        type="text"
                        name="product"
                        minLength="3"
                        label="Produktu"
                        prompt="nevybrán"
                        value={filter.product || ''}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <InputField
                        required={false}
                        type="number"
                        name="limit"
                        min="1"
                        label="Limitu zobrazených"
                        prompt="nevybrán"
                        value={filter.limit  || ''}
                        handleChange={handleChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <InputField
                        required={false}
                        type="date"
                        name="fromDate"
                        min="2000-01-01"
                        label="Od data splatnosti"
                        prompt="nevybrán"
                        value={filter.fromDate  || ''}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <InputField
                        required={false}
                        type="date"
                        name="toDate"
                        min="2000-01-01"
                        label="Do data splatnosti"
                        prompt="nevybrán"
                        value={filter.toDate  || ''}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-md-3"> 
                    <InputField
                        required={false}
                        type="number"
                        name="minPrice"
                        min="1"
                        label="Minimální ceny"
                        prompt="nevybrán"
                        value={filter.minPrice  || ''}
                        handleChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <InputField
                        required={false}
                        type="number"
                        name="maxPrice"
                        min="1"
                        label="Maximální ceny"
                        prompt="nevybrán"
                        value={filter.maxPrice  || ''}
                        handleChange={handleChange}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <input
                        type="submit"
                        className="btn btn-secondary float-right mt-2"
                        value="Potvrdit"
                    />
                </div>
            </div>
        </form>
    );
}   
