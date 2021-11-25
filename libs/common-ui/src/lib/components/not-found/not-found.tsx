import { styled } from '@mui/material';
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const PREFIX = 'NotFound';

const classes = {
    title: `${PREFIX}-title`,
    wrapper: `${PREFIX}-wrapper`,
    details: `${PREFIX}-details`,
    table: `${PREFIX}-table`,
    tableWrapper: `${PREFIX}-tableWrapper`,
    detailsContent: `${PREFIX}-detailsContent`,
    cell: `${PREFIX}-cell`,
    button: `${PREFIX}-button`,
    hr: `${PREFIX}-hr`,
    actions: `${PREFIX}-actions`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.title}`]: {
        lineHeight: '60px',
        fontSize: '60px',
    },
    [`& .${classes.wrapper}`]: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '600px',
    },
    [`& .${classes.tableWrapper}`]: {
        backgroundColor: '#FFFFFF',
        color: 'black',
        padding: '10px',
    },
    [`& .${classes.detailsContent}`]: {
        backgroundImage: 'linear-gradient(0deg, #ffffff 25%, #959496 25%, #959496 50%, #ffffff 50%, #ffffff 75%, #959496 75%, #959496 100%)',
        backgroundSize: '4.00px 4.00px',
        padding: '20px'
    },
    [`& .${classes.details}`]: {
        height: '10px',
        width: '100%',
    },
    [`& .${classes.cell}`]: {
        backgroundColor: '#FFFFFF',
        fontSize: '12px',
        fontFamily: 'Arial',
        border: '1px solid #9A342D',
    },
    [`& .${classes.table}`]: {
        border: '1px solid #9A342D',
        borderCollapse: 'collapse',
    },
    [`& .${classes.button}`]: {
        backgroundColor: '#9A342D',
        fontSize: '10px',
        color: '#F9DFBC',
        border: '1px solid #F9DFBC',
        cursor: 'pointer'
    },
    [`& .${classes.hr}`]: {
        width: '100%',
        height: '1px',
        color: '#9A342D',
    },
    [`& .${classes.actions}`]: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
}));


export const NotFound: FC = () => {
    const {t} = useTranslation();
    const history = useHistory();

    const currDateTime = new Date().toLocaleString();
    const currDate = new Date().toLocaleDateString();

    return (
        <Root>
            <div data-test="page-not-found" className={classes.wrapper}>
                <div>
                    <div className={classes.title}>
                        404
                    </div>
                    <h3>
                        {t('common.pageNotFound')}
                    </h3>
                    <div className={classes.details}>

                    </div>
                </div>
                <div className={classes.detailsContent}>
                    <div className={classes.tableWrapper}>
                        <hr className={classes.hr}/>
                        <b>Podgląd wiadomości</b>
                        <hr className={classes.hr}/>
                        <br/>
                        <table style={{tableLayout: 'fixed', width: '100%'}} className={classes.table}>
                            <tbody>
                            <tr>
                                <td style={{width: '20%'}} className={classes.cell} align="left">
                                    Od:
                                </td>

                                <td style={{width: '80%'}} className={classes.cell} align="left">
                                    Politechnika Wrocławska
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.cell} align="left">
                                    Do:
                                </td>
                                <td className={classes.cell} align="left">
                                    Sokołowski Jakub
                                </td>
                            </tr>

                            <tr>
                                <td className={classes.cell} align="left">
                                    Priorytet:
                                </td>

                                <td className={classes.cell} align="left">
                                    0 - Normalna
                                </td>
                            </tr>

                            <tr>
                                <td className={classes.cell} align="left">
                                    Data utworzenia:
                                </td>

                                <td className={classes.cell} align="left">

                                    {currDateTime}

                                </td>
                            </tr>

                            <tr>
                                <td className={classes.cell} align="left">
                                    Data modyfikacji:
                                </td>

                                <td className={classes.cell} align="left">

                                    {currDateTime}

                                </td>
                            </tr>
                            <tr>
                                <td className={classes.cell} align="left">
                                    Data otrzymania:
                                </td>
                                <td className={classes.cell} align="left">
                                    {currDateTime}
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.cell} align="left">
                                    Temat:
                                </td>
                                <td className={classes.cell} align="left">
                                    Wprowadzenie nowej oceny
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.cell} align="left">
                                    Treść:
                                </td>

                                <td className={classes.cell} align="left">
                                    Została wprowadzona nowa ocena do systemu.
                                    <br/>Rodzaj oceny: Wynik końcowy
                                    <br/>Forma oceny: Ustna
                                    <br/>Ocena: 2.0
                                    <br/>Data zatwierdzenia oceny: {currDate}
                                    <br/>Kurs: Architektura komputerów 1
                                    <br/>Wystawiający: Wielki Sumator
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                            <tr>
                            </tr>
                            </tbody>
                        </table>

                        <br/>
                        <div className={classes.actions}>
                            <button onClick={() => history.push('/')}  className={classes.button}>
                                Odpowiedź
                            </button>
                            <button onClick={() => history.push('/')}  className={classes.button}>
                                Powrót
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Root>
    );
};
