document.ready = function () {
    var firstnames = [
        "Ari",
        "Alexander",
        "Alexio",
        "Bert",
        "Bernie",
        "Bart",
        "Com",
        "Cole",
        "Cory",
        "Dan",
        "Daniel",
        "Don",
        "Eros",
        "Elon",
        "Emre",
        "Fred",
        "Frederick",
        "Floyd",
        "Genghis",
        "Gunther",
        "Gary",
        "Harding"
    ];
    var lastnames = [
        "Gumshoe",
        "Smith",
        "Stassinopoulos",
        "Ari",
        "King",
        "Frederick"
    ];
    var phoneManufacturers = [
        "Apple Komputer",
        "Research in Molasses",
        "Horse Tech Computer",
        "Life's Guude"
    ];
    //Game object for serialization purposes
    var Game = {
        name: "",
        money: 10000,
        properties: {
            stores: [],
            customers: [],
            factories: [],
            towers: [0, 0],
            phones: [
                0,
                0,
                0,
                0
            ]
        },
        propertyCost: {
            stores: [
                //Low level
                300,
                //Central
                500
            ],
            phones: [
                //Flip phone / feature phone
                0.01,
                //Low-level smartphone or high level feature phone
                10,
                //Medium-level smartphone
                100,
                //High-level / professional smartphone
                150
            ],
            customers: [
                //Basic plan (3G, 350 texts)
                -100,
                //Advanced plan (4G, unlimited texting)
                -200
            ],
            factories: [
                //Low level (1000 phones per month)
                1000,
                //High level (10000 phones per month)
                10000
            ],
            towers: [
                //3G
                600,
                //4G
                700
            ]
        }
    };
    //What happens when you reach each month
    var month = function () {
        var oldMoney = Game.money;
        var monthlyCost = 0;
        for (var i in Game.properties.customers) {
            var currCustomer = Game.properties.customers[i];
            Game.money -= Game.propertyCost.customers[currCustomer.level];
            currCustomer.planLastedMonths++;
            if (currCustomer.planLastedMonths >= 12) {
                delete Game.properties.customers[i];
            }
        }
        for(var i in Game.properties.stores) {
            money -= Game.propertyCost.stores[Game.properties.stores[i].level] - Game.properties.stores[i].amountOfCustomers;
            monthlyCost += Game.propertyCost.stores[Game.properties.stores[i].level] - Game.properties.stores[i].amountOfCustomers;
        }
        for(var i in Game.properties.factories) {
            money -= 0.1 * Game.properties.factories[i].phonesProduced;
            monthlyCost += 0.1 * Game.properties.factories[i].phonesProduced;
            Game.properties.factories[i].phonesProduced = 0;
        }
        console.log("Month passed. \n\
            New money: " + Game.money + "\n\
            Old money: " + oldMoney + "\n\
            Monthly costs: " + monthlyCost + "\n\
        ");
    };

    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var getRandomBoolean = function () {
        return Math.random() >= 0.5;
    }

    var displayUpdate = function () {
        $('#money').html(Game.money - Game.money % 0.01);
        $('#stores').empty();
        for (var i in Game.properties.stores) {
            var num = i;
            var assemblyString = '<div class="store">\n<b> Store #';
            assemblyString += num;
            assemblyString += '</b><br/>\n# of customers: ' + Game.properties.stores[i].amountOfCustomers + '<br/>\n';
            assemblyString += '<button class="deleteStore" data-store="' + i + '">Delete</button><br/>\n';
            assemblyString += "</div>";
            $('#stores').append(assemblyString);
        }
        $('#phDis').html(Game.properties.phones[0] + "|" + Game.properties.phones[1] + "|" + Game.properties.phones[2] + "|" + Game.properties.phones[3]);
        $('#facDis').html(Game.properties.factories.length);
    }

    //Static variables
    var days = 0;
    var daysInAMonth = 30;
    //Inverval
    setInterval(function () {
        days++;
        displayUpdate();
        if (days % daysInAMonth == 0) {
            month();
        }
        for(var i in Game.properties.factories) {
            for(var e = 0; e < Math.floor(Game.propertyCost.factories[Game.properties.factories[i].level] / 30); e++) {
                var phoneType = getRandomInt(0, Game.propertyCost.phones.length - 1);
                Game.properties.phones[phoneType]++;
                Game.properties.factories[i].phonesProduced++;
            }
        }
        for (var i in Game.properties.stores) {
            var currStore = Game.properties.stores[i];
            var isNewCustomer = getRandomBoolean();
            var planNumber = getRandomInt(0, Game.propertyCost.customers.length - 1);
            var phoneType = getRandomInt(0, Game.propertyCost.phones.length - 1);
            var manufacturer = getRandomInt(0, phoneManufacturers.length - 1);
            var fName = getRandomInt(0, firstnames.length - 1);
            var lName = getRandomInt(0, lastnames.length - 1);
            if (isNewCustomer && Game.properties.phones[phoneType] != 0) {
                currStore.amountOfCustomers++;
                Game.properties.phones[phoneType]--;
                Game.properties.customers.push({
                    level: planNumber,
                    phoneType: phoneType,
                    name: firstnames[fName] + " " + lastnames[lName],
                    planLastedMonths: 0
                });
                Game.money -= Game.propertyCost.customers[planNumber];
                Game.money += Game.propertyCost.phones[phoneType] * 0.9;
                console.log("New customer:\n\
                    Plan type: " + planNumber + "\n\
                    Phone type: " + phoneType + "\n\
                    Phone manufacturer: " + phoneManufacturers[manufacturer] + "\n\
                    Name: " + firstnames[fName] + " " + lastnames[lName] + "\n\
                ");

            }
        }
    }, 1000);
    //
    //
    var selectedStore = null;
    $('#startar').click(function () {
        $('#init').slideUp(500);
        setTimeout(function () {
            $('#init2').slideDown(250);
        }, 250);
    });
    $('#startar2').click(function () {
        Game.name = $('#cN').val();
        $('#init2').slideUp(500);
        setTimeout(function () {
            $('#game').slideDown();
        }, 250);
    });
    $('#buyStore').click(function () {
        var level = parseInt($('#storeLevel').val());
        if (Game.money > Game.propertyCost.stores[level]) {
            Game.money -= Game.propertyCost.stores[level];
            Game.properties.stores.push({
                amountOfCustomers: 0,
                level: level
            });
        } else {
            alert("You don't have enough money! You need £" + (Game.propertyCost.stores[level] + 1));
        }
        displayUpdate();
    });
    $('#buyPhone').click(function () {
        var level = parseInt($('#phoneLevel').val());
        if (Game.money > Game.propertyCost.phones[level]) {
            Game.money -= Game.propertyCost.phones[level];
            Game.properties.phones[level]++;
        } else {
            alert("You don't have enough money! You need £" + (Game.propertyCost.phones[level] + 1));
        }
        displayUpdate();
    });
    $('#buyFactory').click(function () {
        var level = parseInt($('#factoryLevel').val());
        if (Game.money > Game.propertyCost.factories[level]) {
            Game.money -= Game.propertyCost.factories[level];
            Game.properties.factories.push({
                level: level,
                phonesProduced: 0
            });
        } else {
            alert("You don't have enough money! You need £" + (Game.propertyCost.factories[level] + 1));
        }
        displayUpdate();
    });
    $('.deleteStore').click(function() {
        console.log(Game.properties.stores[store]);
        var store = parseInt($(this).attr('data-store'));
        delete Game.properties.stores[store];
        displayUpdate();
    });
};