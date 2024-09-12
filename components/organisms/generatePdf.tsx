// @ts-ignore

import React from 'react';
import {
    Document,
    Page,
    View,
    Text,
    Font,
    StyleSheet,
    Image
} from '@react-pdf/renderer';
import { ConvertDecimal } from '@/utils/convertDecimal';

const styles = StyleSheet.create({
    body: {
        paddingLeft: 10,
        paddingRight: 10,
        flexGrow: 1,
    },
    row: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    space: {
        marginTop: 20
    },
    spaceFirm: {
        paddingTop: 15,
        paddingBottom: 15
    },
    spaceOthers: {
        marginTop: 15,
    },
    text: {
        textAlign: 'justify',
    },
    textCentral: {
        textAlign: 'justify',
        paddingBottom: 14,
    },
    section: { textAlign: 'center', margin: 10 },
    sectionFooter: {
        margin: 10,
        padding: 10,
        textAlign: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        height: 200,
    },
    table: {
        width: '100%',
        borderWidth: 1, // Aplica el borde completo a la tabla
        borderColor: '#000',
    },
    tableHeaderRow: {
        backgroundColor: '#d3d3d3', // Gray background for header
        flexDirection: 'row',
    },
    tableRow: {
        flexDirection: 'row',
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000',
    },
    tableCell: {
        flex: 1,
        padding: 2,
        textAlign: 'right',
        borderRight: '1px solid #000',
    },
    tableCellOptional: {
        flex: 1,
        padding: 2,
        textAlign: 'center',
        borderRight: '1px solid #000',
    },
    tableCellTextBold: {
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Lato Bold',
    },
    tableHeaderCell: {
        flex: 1,
        borderRight: '1px solid #000',
        padding: 4,
        fontWeight: 'bold',
    },
    boldFont: {
        fontWeight: 'bold',
        textAlign: 'justify',
        fontFamily: 'Lato Bold',
    },
    h1: {
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Lato Bold',
    },
    page: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        flexGrow: 1,
        fontSize: 10,
    },
    image: {
        width: 150,
    },
    sectionLeft: {
        width: '40%',
        alignItems: 'flex-start',
        fontSize: 8,
        marginBottom: 0,
      },
      sectionRight: {
        width: '40%',
        alignItems: 'flex-end',
        fontSize: 8,
        paddingLeft: 5,
    },
});

// Font.register({
//     family: 'Oswald',
//     src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
// });
Font.register({
    family: 'Open Sans',
    src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
  });
  
  Font.register({
    family: 'Lato',
    src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
  });
  
  Font.register({
    family: 'Lato Italic',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
  });
  
  Font.register({
    family: 'Lato Bold',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
  });

interface IGeneratePdfComponents {
    date: string;
    rif_cotitular: string;
    Nombrecliente: string;
    Impuesto: string | number;
    dataAmountUSD: any[];
    dataAmountDOP: any[];
    decimal: string | number;
    nameNumber: string;
    year: string | number;
}

const GeneratePdfComponents = (props: IGeneratePdfComponents) => (
    <>
        <Document>
            <Page size={{ width: 600, height: 698 }} style={{ paddingBottom: 73 }}>
                <View fixed style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 10,
                    top: 0,
                }}>
                    <Image src={'/documents.jpg'} style={styles.image} />
                </View>
                <View>
                        <View style={styles.page}>
                            <View style={styles.section}>
                                <Text style={styles.text}>{props.date}</Text>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.boldFont}>
                                    <Text style={styles.boldFont}>Señor</Text>
                                    <Text style={styles.boldFont}>Director General de Impuestos Internos </Text>
                                    <Text style={styles.boldFont}>Dirección General de Impuestos Internos</Text>
                                    <Text style={styles.boldFont}>Av. México Nº48,</Text>
                                    <Text style={styles.boldFont}>Gazcue,</Text>
                                    <Text style={styles.boldFont}>Santo Domingo, República Dominicana.</Text>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.row}>
                                    <View>
                                        <Text style={styles.boldFont}>Atención: </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.boldFont}>Luis Valdez Veras </Text>
                                        <Text style={styles.boldFont}>Director General de Impuestos Internos</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.row}>
                                    <Text style={styles.text}>Distinguidos Señores: </Text>
                                </View>
                            </View>
                            <View style={styles.section}>
                                <View style={styles.row}>
                                    <Text style={styles.textCentral}>
                                        Por medio de la presente tenemos a bien certificar que de acuerdo con lo dispuesto en la Ley 11-92 - Título 2, Artículo  309,  modificado  en
                                        la  Ley  253-12  por  este  medio  certificamos  que  el <Text style={styles.h1}> { props.Nombrecliente }</Text>,  portador(a)  de  la  Cédula  de  Identidad  y
                                        Electoral  <Text style={styles.h1}>No. { props.rif_cotitular }</Text>,  le  fue retenida la suma &nbsp; de <Text style={styles.h1}>RD$ { props.Impuesto } ({props.nameNumber}pesos con {props.decimal}/100)</Text>,
                                        en el año  {props.year}, por  concepto  de  retención  del  10%  de  ISR,  por  los  intereses  pagados  por  préstamos  de  valores, considerados como pagos
                                        únicos y definitivos. Los mismos fueron reportados y pagados en nuestro formato IR-17, según detallamos a continuación:
                                    </Text>
                                </View>
                            </View>
                            {
                                props.dataAmountDOP.length ?
                                    <View style={styles.section}>
                                        <View style={styles.table}>
                                            <View style={styles.tableHeaderRow}>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Fecha Factura y emisión de pago</Text>
                                                </View>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Valor de la Inversión en RD$</Text>
                                                </View>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Monto Facturado RD$</Text>
                                                </View>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Monto Retenido (10% ISR) RD$</Text>
                                                </View>
                                                {/* <View style={styles.tableHeaderCell}>
                                                    <Text>Tasa USD</Text>
                                                </View> */}
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Mes de Reportada las Retenciones</Text>
                                                </View>
                                            </View>
                                            {props.dataAmountDOP.map((rowData: any, key: number) => (
                                                <View style={styles.tableRow} key={key}>
                                                    {
                                                        (key + 1) === props.dataAmountDOP.length ?
                                                            <>
                                                                <View style={styles.tableCellOptional}>
                                                                    <Text style={styles.tableCellTextBold}>{rowData.Fechavenc}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text style={styles.tableCellTextBold}>{rowData.Nominal}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text style={styles.tableCellTextBold}>{rowData.Contrap}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text style={styles.tableCellTextBold}>{rowData.Impuesto}</Text>
                                                                </View>
                                                                {/* <View style={styles.tableCell}>
                                                                    <Text>{rowData.Moneda_tc}</Text>
                                                                </View> */}
                                                                <View style={styles.tableCellOptional}>
                                                                    <Text style={styles.tableCellTextBold}>{rowData.Mes}</Text>
                                                                </View>
                                                            </> : <>
                                                                <View style={styles.tableCellOptional}>
                                                                    <Text>{rowData.Fechavenc}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text>{rowData.Nominal}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text>{rowData.Contrap}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text>{rowData.Impuesto}</Text>
                                                                </View>
                                                                {/* <View style={styles.tableCell}>
                                                                    <Text>{rowData.Moneda_tc}</Text>
                                                                </View> */}
                                                                <View style={styles.tableCellOptional}>
                                                                    <Text>{rowData.Mes}</Text>
                                                                </View>
                                                            </>
                                                    }
                                                </View>
                                            ))}
                                        </View>
                                    </View> : <View></View>
                            }
                            {
                                props.dataAmountUSD.length ?
                                    <View style={styles.section}>
                                        <View style={styles.table}>
                                            <View style={styles.tableHeaderRow}>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Fecha Factura y emisión de pago</Text>
                                                </View>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Valor de la Inversión en US$</Text>
                                                </View>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Monto Facturado RD$</Text>
                                                </View>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Monto Retenido (10% ISR) RD$</Text>
                                                </View>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Tasa USD</Text>
                                                </View>
                                                <View style={styles.tableHeaderCell}>
                                                    <Text>Mes de Reportada las Retenciones</Text>
                                                </View>
                                            </View>
                                            {props.dataAmountUSD.map((rowData: any, key: number) => (
                                                <View style={styles.tableRow} key={key}>
                                                    {
                                                        (key + 1) === props.dataAmountUSD.length ?
                                                            <>
                                                                <View style={styles.tableCellOptional}>
                                                                    <Text style={styles.tableCellTextBold}>{rowData.Fechavenc}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text style={styles.tableCellTextBold}>{rowData.Nominal}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text style={styles.tableCellTextBold}>{ConvertDecimal(rowData.Contrap)}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text style={styles.tableCellTextBold}>{ConvertDecimal(rowData.Impuesto)}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text style={styles.tableCellTextBold}>{rowData.Tcfinal}</Text>
                                                                </View>
                                                                <View style={styles.tableCell}>
                                                                    <Text style={styles.tableCellTextBold}>{rowData.Mes}</Text>
                                                                </View>
                                                            </> : <>
                                                            <View style={styles.tableCellOptional}>
                                                                <Text>{rowData.Fechavenc}</Text>
                                                            </View>
                                                            <View style={styles.tableCell}>
                                                                <Text>{rowData.Nominal}</Text>
                                                            </View>
                                                            <View style={styles.tableCell}>
                                                                <Text>{ConvertDecimal(rowData.Contrap)}</Text>
                                                            </View>
                                                            <View style={styles.tableCell}>
                                                                <Text>{ConvertDecimal(rowData.Impuesto)}</Text>
                                                            </View>
                                                            <View style={styles.tableCell}>
                                                                <Text>{rowData.Tcfinal}</Text>
                                                            </View>
                                                            <View style={styles.tableCellOptional}>
                                                                <Text>{rowData.Mes}</Text>
                                                            </View>
                                                            </>
                                                    }
                                                </View>
                                            ))}
                                        </View>
                                    </View> : <View></View>
                            }
                            <View style={styles.section}>
                                <View>
                                    <Text style={styles.text}>La presente certificación se expide a solicitud de la parte interesada.</Text>
                                    <Text  style={styles.space} />
                                    <View>
                                        <Text style={styles.text}>Muy atentamente,</Text>
                                    </View>
                                    <Text  style={styles.space} />
                                    <View style={{ fontFamily: "Helvetica-Oblique" }}>
                                        {/* <Text style={styles.boldFont}>_____________________________</Text> */}
                                        <Text style={styles.section}></Text>
                                        <Text style={styles.boldFont}>Patricia A. Rímoli Suncar</Text>
                                        <Text style={styles.boldFont}>Directora de Finanzas y Contraloría – Contralor</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                </View>
                <View fixed style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                }}>
                    <View style={styles.sectionLeft}>
                        <Text style={styles.section}></Text>
                        <Text style={styles.text}>RNC: 1-01-56714-7</Text>
                        <Text style={styles.text}>Miembro de la Bolsa de Valores de</Text>
                        <Text style={styles.text}>la República Dominicana, S.A.</Text>
                    </View>
                    <View style={styles.sectionRight}>
                        <Text style={styles.text}>O: 1 809 560 0909</Text>
                        <Text style={styles.text}>F: 1 809 560 6969</Text>
                        <Text style={styles.text}>Prol. Av. 27 de Febrero Nº1762</Text>
                        <Text style={styles.text}>Santo Domingo, Rep. Dom.</Text>
                        <Text style={styles.text}>www.parval.com.do</Text>
                    </View>
                </View>
            </Page>
        </Document>
    </>
);

export default GeneratePdfComponents;
