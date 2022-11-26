type ServiceOptions = {
    spreadSheetId: string;
    url: string;
    fields: string[];
};

const service = ({ spreadSheetId, url, fields }: ServiceOptions) => {
    try {
        const data = JSON.parse(UrlFetchApp.fetch(url).getContentText());

        const values = [fields, ...data.map((row: any) => fields.map((field) => row[field]))];

        const ss = SpreadsheetApp.openById(spreadSheetId);
        const sheet = ss.getSheetByName('inventory-balance.data');

        sheet.getRange(1, 1, 200_000, fields.length).clearContent();

        sheet.getRange(1, 1, values.length, fields.length).setValues(values);
    } catch (err) {
        console.error(err);
        SpreadsheetApp.getUi().alert(JSON.stringify(err));
    }
};

const getInventoryMattress = () => {
    return service({
        spreadSheetId: '17w6a32tfbZ7F-LgUdYGJbe-qvfr6_zmXef4GVyQivCo',
        url: 'https://bi.vuanem.com/api/netsuite-api/suiteql/inventory-balance-mattress',
        fields: [
            'city_id',
            'class_length',
            'class_name',
            'class_thickness',
            'class_width',
            'location_name',
            'qty_available',
            'qty_committed',
            'qty_on_hand',
        ],
    });
};

const getInventoryAcc = () => {
    return service({
        spreadSheetId: '1veGpGHmowg7tQJfFct5l4STxI-dtCxjRu-5cIh45iao',
        url: 'https://bi.vuanem.com/api/netsuite-api/suiteql/inventory-balance-acc',
        fields: [
            'location_name',
            'item_id',
            'display_name',
            'qty_available',
            'qty_committed',
            'qty_on_hand',
        ],
    });
};
