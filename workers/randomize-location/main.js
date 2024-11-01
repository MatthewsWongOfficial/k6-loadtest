const { faker } = require('@faker-js/faker');
const moment = require('moment');
const gate = require('./location-random.js')

const customerDetail = [
    { id: '535014', name: 'Michael Johnson' },
    { id: '789847', name: 'Emily Miller' },
    { id: '352820', name: 'Robert Brown' },
    { id: '374562', name: 'Robert Garcia' },
    { id: '454416', name: 'John Davis' },
    { id: '696146', name: 'David Brown' },
    { id: '333624', name: 'Robert Johnson' },
    { id: '193748', name: 'Jane Garcia' },
    { id: '800581', name: 'Sarah Brown' },
    { id: '118754', name: 'Emily Williams' },
    { id: '381738', name: 'David Smith' },
    { id: '697667', name: 'Robert Davis' },
    { id: '933639', name: 'Jane Johnson' },
    { id: '118754', name: 'Emily Williams' },
    { id: '907991', name: 'Sarah Smith' },
    { id: '630225', name: 'Jessica Williams' },
    { id: '676636', name: 'John Jones' },
    { id: '535014', name: 'Michael Johnson' },
    { id: '895677', name: 'Robert Smith' },
    { id: '930516', name: 'Sarah Davis' },
    { id: '468522', name: 'Michael Garcia' },
    { id: '310550', name: 'Jessica Garcia' },
    { id: '468522', name: 'Michael Garcia' },
    { id: '317892', name: 'Jessica Miller' },
    { id: '964457', name: 'Sarah Williams' },
    { id: '118754', name: 'Emily Williams' },
    { id: '678092', name: 'Michael Jones' },
    { id: '649112', name: 'Jessica Brown' },
    { id: '317892', name: 'Jessica Miller' },
    { id: '676636', name: 'John Jones' },
    { id: '381738', name: 'David Smith' },
    { id: '118754', name: 'Emily Williams' },
    { id: '468522', name: 'Michael Garcia' },
    { id: '759824', name: 'Emily Garcia' },
    { id: '180289', name: 'Robert Jones' },
    { id: '930516', name: 'Sarah Davis' },
    { id: '941375', name: 'David Johnson' },
    { id: '676636', name: 'John Jones' },
    { id: '535014', name: 'Michael Johnson' },
    { id: '965423', name: 'David Miller' },
    { id: '452413', name: 'John Smith' },
    { id: '895677', name: 'Robert Smith' },
    { id: '759824', name: 'Emily Garcia' },
    { id: '454416', name: 'John Davis' },
    { id: '465635', name: 'Emily Johnson' },
    { id: '649112', name: 'Jessica Brown' },
    { id: '678092', name: 'Michael Jones' },
    { id: '627236', name: 'Jane Davis' },
    { id: '800581', name: 'Sarah Brown' },
    { id: '941375', name: 'David Johnson' },
    { id: '997750', name: 'Michael Davis' },
    { id: '176932', name: 'John Brown' },
    { id: '697667', name: 'Robert Davis' },
    { id: '446906', name: 'Robert Williams' },
    { id: '895677', name: 'Robert Smith' },
    { id: '697667', name: 'Robert Davis' },
    { id: '468522', name: 'Michael Garcia' },
    { id: '620987', name: 'Sarah Garcia' },
    { id: '649112', name: 'Jessica Brown' },
    { id: '930516', name: 'Sarah Davis' },
    { id: '933639', name: 'Jane Johnson' },
    { id: '310550', name: 'Jessica Garcia' },
    { id: '676636', name: 'John Jones' },
    { id: '475535', name: 'John Johnson' },
    { id: '709700', name: 'Sarah Johnson' },
    { id: '697667', name: 'Robert Davis' },
    { id: '678092', name: 'Michael Jones' },
    { id: '468522', name: 'Michael Garcia' },
    { id: '407180', name: 'John Williams' },
    { id: '268580', name: 'David Davis' },
    { id: '446906', name: 'Robert Williams' },
    { id: '721071', name: 'John Miller' },
    { id: '180289', name: 'Robert Jones' },
    { id: '718259', name: 'Michael Williams' },
    { id: '118754', name: 'Emily Williams' },
    { id: '333624', name: 'Robert Johnson' },
    { id: '615576', name: 'Jessica Davis' },
    { id: '744429', name: 'Emily Jones' },
    { id: '446906', name: 'Robert Williams' },
    { id: '468522', name: 'Michael Garcia' },
    { id: '535014', name: 'Michael Johnson' },
    { id: '535014', name: 'Michael Johnson' },
    { id: '907991', name: 'Sarah Smith' },
    { id: '997750', name: 'Michael Davis' },
    { id: '317892', name: 'Jessica Miller' },
    { id: '630225', name: 'Jessica Williams' },
    { id: '448674', name: 'Emily Davis' },
    { id: '744429', name: 'Emily Jones' },
    { id: '301140', name: 'John Garcia' },
    { id: '465635', name: 'Emily Johnson' },
    { id: '448674', name: 'Emily Davis' },
    { id: '933639', name: 'Jane Johnson' },
    { id: '337503', name: 'David Garcia' },
    { id: '452413', name: 'John Smith' },
    { id: '721071', name: 'John Miller' },
    { id: '176932', name: 'John Brown' },
    { id: '789847', name: 'Emily Miller' },
    { id: '907991', name: 'Sarah Smith' },
    { id: '718259', name: 'Michael Williams' },
    { id: '180289', name: 'Robert Jones' }
]




// Function to generate random order positions
function generateRandomOrderPositions(count, tourNumber) {
    const orderPositions = [];
    for (let i = 0; i < count; i++) {
        orderPositions.push({
            tenant: "not_set",
            tourNumber: tourNumber,
            articleNumber: "0099999",
            text:  "Dummyartikel Trinks Leerg -nicht löschen-",
            amount: faker.number.float({ min: 1, max: 100, multipleOf: 0.1 }),
            unit: "MIN",
            newAmount: null,
            isNew: false,
            isEmptyReturn: null,
            itemType: "Artikel (normal)",
            returnItemType: false,
            textItemType: false,
            inventoryItemType: false,
            emptyItemType: false,
            freeItem: false,
            visibleOnClient: true
        });
    }
    return orderPositions;
}

// Function to generate random orders
function generateRandomOrders(count, tourNumber, stopNumber, address) {
    const orders = [];
    for (let i = 0; i < count; i++) {
        const orderPositionCount = faker.number.int({ min: 1, max: 5 });  // Randomize the number of order positions
        const customerIndex = faker.number.int({ min: 0, max: 99 }).toString();
        const customerNumber = customerDetail[customerIndex]["id"]
        const customerText = customerDetail[customerIndex]["name"]


        orders.push({
            orderPositions: generateRandomOrderPositions(orderPositionCount,tourNumber),
            tenant: "not_set",
            tourNumber: tourNumber,
            stopNumber: stopNumber,
            orderNumber: "",
            address: {
                street: address["street"],
                city: address["city"],
                zipcode: address["zipcode"],
                country: address["country"],
            },
            customerNumber: customerNumber,
            customerNumberExternal: null,
            customerText: customerText,
            contractNumber: null,
            customerLoadingLocation: "Überweisungsauftrag der Krombacher Brauerei\r\n***************************************************",
            orderId: null,
            tracesId: null,
            orderStatus: null,
            orderKey: `{${faker.string.uuid()}}`
        });
    }
    return orders;
}

// Function to generate random tour stops
async function generateRandomTourStops(numberOfStops, numberOfOrders, tourNumber) {
    const tourStops = [];
    for (let i = 0; i < numberOfStops; i++) {
        const address = (await gate())[0]
        const stopNumber= `${faker.number.int({ min: 10000, max: 99999 }).toString()}_1`;
        tourStops.push({
            id: null,
            tracesId: null,
            customerNumber: null,
            stopName: null,
            orders: generateRandomOrders(numberOfOrders, tourNumber, stopNumber, address),
            tenant: "not_set",
            email: "",
            tourNumber: tourNumber,
            stopNumber: stopNumber,
            stopIndex: 0,
            stopStatus: "NEW",
            duration: null,
            address: {
                street: address["street"],
                city: address["city"],
                zipcode: address["zipcode"],
                country: address["country"],
            },
            coordinate: null,
            tourStopNotifications: null,
            durationFromLastStop: null,
            stopStart: null,
            stopEnd: null,
            stopApproach: null,
            twStart: null,
            twEnd: null,
            twStartOutlet: null,
            twEndOutlet: null,
            isTwFromOutlet: null,
            outlet: null
        });
    }
    return tourStops;
}

// Function to generate the full JSON structure
async function generateTourData(numberOfStops, numberOfOrders) {
    const tourNumber = faker.number.int({ min: 100000, max: 999999 }).toString();
    // Using faker to generate a recent date
    const recentDate = faker.date.recent();
    // Formatting the faker date to match the moment output
    const tourDate = moment(recentDate).startOf('day').format('YYYY-MM-DD[T]HH:mm') + "+02:00";


    return {
        tourId: null,
        tourStops: await generateRandomTourStops(numberOfStops, numberOfOrders, tourNumber),
        tourCoordinates: null,
        tourBreaks: null,
        tourNumber: tourNumber,
        tourNumberGL: "3061",
        tripNumber: "1",
        tenantConfig: {
            tenant: null,
            tenantKey: "BEHNGT",
            tenantInfo: null
        },
        tourStatus: "NEW",
        tracesId: null,
        tourStart: null,
        tourEnd: null,
        trailer: "",
        vehicle: "ECK-WB 28",
        driver: "Sascha Krehmke (1887)",
        coDriver: "1804",
        tourText: "ECK | Eckernförde",
        tourDate: tourDate,
        plannedStart: null,
        baseAddress: null,
        tourSorted: null,
        matrix: null,
        matrixStops: null,
        totalStops: null,
        matrixDistance: null,
        matrixDuration: null,
        modifiedAt: null,
        tourState: null,
        isOptimized: null,
        optimizerType: null,
        totalLoadingDuration: null,
        operation: null,
        appVersion: null,
        serverVersion: "1.53.0",
        clientId: "1",
        deviceId: null
    };
}

async function createTourData(numberOfStops = 2, numberOfOrders = 1) {
    const tourData = await generateTourData(numberOfStops, numberOfOrders);
    console.log(JSON.stringify(tourData, null, 2));
    return tourData;
}

createTourData();
