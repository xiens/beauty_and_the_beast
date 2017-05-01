
var pageNum=0;
var howManyOnSite=5;
var sort_by=0; //number from 0 to 5 depending on what was chosen in select_obj
var temp= []; //temp table for storing dateOfBirth
var pagination = false; //bool for printing table with or without pagination
var filterByID=false, filterByFirstName=false, filterByFunction=false;
var filterBySecondName=false, filterByExperience=false, filterByDate=false;
var start=0, end=4;
var sort_names=0; //for changing in firstname filter

var obj =[
    {
        "id":1,
        "firstName":"Dobromir",
        "lastName":"Sprytny",
        "dateOfBirth":"1.7.1990 11:35",
        "function":"kamerdyner",
        "experience":4
    },
    {
        "id":4,
        "firstName":"Helga",
        "lastName":"Uczynna",
        "dateOfBirth":"4.02.1976 14:37",
        "function":"pokojówka",
        "experience":12
    },
    {
        "id":2,
        "firstName":"Marianna",
        "lastName":"Prostota",
        "dateOfBirth":"28.10.1976 2:15",
        "function":"pokojówka",
        "experience":12
    },
    {
        "id":3,
        "firstName":"Walerian",
        "lastName":"Szybki",
        "dateOfBirth":"03.01.1986 23:10",
        "function":"kamerdyner",
        "experience":10
    },
    {
        "id":5,
        "firstName":"Krzysztof",
        "lastName":"Klucznik",
        "dateOfBirth":"10.10.1986 18:00",
        "function":"lokaj",
        "experience":3
    },
    {
        "id":6,
        "firstName":"Konstancja",
        "lastName":"Urodziwa",
        "dateOfBirth":"29.02.1936 13:33",
        "function":"kucharka",
        "experience":8
    },
    {
        "id":7,
        "firstName":"Kornelia",
        "lastName":"Wstydliwa",
        "dateOfBirth":"19.02.1973 23:55",
        "function":"pokojówka",
        "experience":8
    },
    {
        "id":8,
        "firstName":"Władysława",
        "lastName":"Dobrotliwa",
        "dateOfBirth":"29.12.1977 18:25",
        "function":"pokojówka",
        "experience":8
    },
    {
        "id":9,
        "firstName":"Mirosław",
        "lastName":"Podstępny",
        "dateOfBirth":"09.12.1972 17:35",
        "function":"kamerdyner",
        "experience":8
    },
    {
        "id":10,
        "firstName":"Walerian",
        "lastName":"Drażliwy",
        "dateOfBirth":"29.03.1980 15:36",
        "function":"lokaj",
        "experience":8
    },
    {
        "id":11,
        "firstName":"Katarzyna",
        "lastName":"Krasna",
        "dateOfBirth":"05.05.1983 01:15",
        "function":"pokojówka",
        "experience":8
    },
    {
        "id":12,
        "firstName":"Urszula",
        "lastName":"Markotna",
        "dateOfBirth":"06.04.1981 12:35",
        "function":"pokojówka",
        "experience":8
    }
];

var length = obj.length;


//creating 2 dimensional table
function to2DTable(rowNum) {
    var tab = new Array(rowNum);
    for (var i = 0; i < rowNum; i++) {
        tab[i] = [];
    }
    return tab;
}
var table = to2DTable(12);
var temp_table = to2DTable(12);
table_length=6;

//Adding to array for ex obj[i].id,  obj[i].firstName itd...
for(var i=0;i<length;i++) {
    table[i][0] = obj[i].id;
    table[i][1] = obj[i].firstName;
    table[i][2] = obj[i].lastName;
    //table[i][3] = DateToInt(obj[i].dateOfBirth);
    table[i][4] = obj[i].function;
    table[i][5] = obj[i].experience;

}


//function to convert date format to integer
function DateToInt(data) {
    var data_new = "";
    var position = data.indexOf(' ');
    data_new = data.substring(0, position)
    var time = data.substring(position, data.length);

    var data_parts = data_new.split('.');
    data_new = data_parts[2] + "-" + data_parts[1] + "-" + data_parts[0] + time;

    var ds = new Date(data_new).getTime();
    return ds;
}
//date filtering
$(function() {
    $('#fromDate').datepick();
    $('#toDate').datepick();
});

function filtrDate(){

    filterByDate=true;
    var fromDate = $("#fromDate").val();
    var toDate = $("#toDate").val();
    var a=DateToInt(fromDate); //starting date
    var b=DateToInt(toDate); //ending date
    var x_temp = [];
    var data;
    //deleting previous values from table
    $("#nameTable > tbody").empty();
    for (i = 0; i < length; i++) {
        data= obj[i].dateOfBirth;
        x_temp[i] = DateToInt(data);
        if(x_temp[i]>a && x_temp[i] < b)
            printTable(i, temp[i]);
    }
}
function resetDateFilter() {
    filterByDate=false;
    //$("#fromDate").text('');
    //$("#toDate").text('');
    $("#nameTable > tbody").empty();
    for (i = 0; i < length; i++) {
        printTable(i, temp[i]);
    }
}
//ID filtering
function filtrID()
{
    filterByID=true;
    var IDNums = document.getElementById("filtrID").selectedIndex;
    if(IDNums==1)
    {
        start=0;
        end=4;
    }
    else if(IDNums==2)
    {
        start=5;
        end=8;
    }
    else if(IDNums==3)
    {
        start=9;
        end=12;
    }
    else if(IDNums==0) filterByID=false;
    sort();
}

//experience filtering
function filtrExperience()
{
    filterByExperience=true;
    var ENums = document.getElementById("filtrExperience").selectedIndex;
    if(ENums==1)
    {
        start=0;
        end=4;
    }
    else if(ENums==2)
    {
        start=5;
        end=8;
    }
    else if(ENums==3)
    {
        start=9;
        end=12;
    }
    else if(ENums==0) filterByExperience=false;
    sort();
}

//firstName filtering
function filtrFirstName(array)
{
    filterByFirstName=true;
    var x= [];

    for(var i=0;i<length;i++)
    {
        x[i]= array[i][1].substring(0,1);
    }

    var names_cnt=0; //counter for counting number of names
    var letters = document.getElementById("filtrFirstName").selectedIndex;

    sort_names=letters;
    if(letters==0) filterByFirstName=false;
    sort();
}

//secondName filtering
function filtrSecondName(array)
{
    filterBySecondName=true;
    var x= [];

    for(var i=0;i<length;i++)
    {
        x[i]= array[i][2].substring(0,1);
    }

    var names_cnt=0; //counter for counting number of names
    var letters = document.getElementById("filtrSecondName").selectedIndex;

    sort_names=letters;
    if(letters==0) filterBySecondName=false;
    sort();
}

//function filtering
function filtrFunction()
{
    filterByFunction=true;
    var fNums = document.getElementById("filtrFunction").selectedIndex;
    sort_names=fNums;
    if(fNums==0) filterByFunction=false;
    sort();

}

//changing pagination
function changePagination(pag)
{
    if(pag==true) {
        pagination = false;
        sort();
    }

    else {
        pagination = true;
        showOnPage();
    }
}
//function for selecting index from select_obj
function sortKey() {

    var objNum = document.getElementById("select_obj").selectedIndex;
    sort_by=objNum;
    sort();
}

function printTable(i, t){

    $("#nameTable").append([
        '<tr>',
        "<td><b>" + table[i][0] + "</b></td>",
        "<td><b>" + table[i][1] + "</b></td>",
        "<td><b>" + table[i][2] + "</b></td>",
        "<td><b>" + t + "</b></td>",
        "<td><b>" + table[i][4] + "</b></td>",
        "<td><b>" + table[i][5] + "</b></td>",
        '</tr>'
    ].join(''));
}

function sort() {

    //checking if we want to sort increasing or decreasing
    var sort_index = document.getElementById("sort_low_or_high").selectedIndex;
    if(sort_index==0)
        increasing=true;
    else
        increasing=false;

    var obj_index = document.getElementById("select_obj").selectedIndex;

//deleting previous values from table
    $("#nameTable > tbody").empty();


//Adding date to array as an integer number
        if (sort_by == 3) {

            for (var i = 0; i < length; i++) {

                var data = obj[i].dateOfBirth;
                table[i][sort_by] = DateToInt(data);
            }

        }

 //Adding to array for ex obj[i].id,  obj[i].firstName itd...
    for(var i=0;i<length;i++) {
        table[i][0] = obj[i].id;
        table[i][1] = obj[i].firstName;
        table[i][2] = obj[i].lastName;
        //table[i][3] = DateToInt(obj[i].dateOfBirth);
        table[i][4] = obj[i].function;
        table[i][5] = obj[i].experience;

    }

    ///
    var temp1=[]; //numbers of sorted elements
    for(var i=0;i<length;i++) temp1[i]=i;

    if(increasing==true) {
//sorting in increasing order
        var j = 0;
        for (var i = 0; i < length; i++)
        {   k=i;
            min_element = table[i][sort_by];
            for (j=i+1;j < obj.length; j++)
                if (table[j][sort_by]<min_element)
                {   k=j;
                    min_element=table[j][sort_by];
                }
            p=temp1[k];
            temp1[k]=temp1[i];
            temp1[i]=p;
            table[k][sort_by] = table[i][sort_by];
            table[i][sort_by]=min_element;

        }
    }
    else {
        //sorting in decreasing order
        var j = 0;
        var k=0;
        for (var i = 0; i < length; i++)
        {   k=i;
            min_element = table[i][sort_by];
            for (j=i+1;j < obj.length; j++)
                if (table[j][sort_by]>min_element)
                {   k=j;
                    min_element=table[j][sort_by];
                }
            p=temp1[k];
            temp1[k]=temp1[i];
            temp1[i]=p;
            table[k][sort_by] = table[i][sort_by];
            table[i][sort_by]=min_element;

        }
    }

    //adding elements to an array
    for(var i=0;i<length;i++)
    {  table[i][0]=obj[temp1[i]].id;
        table[i][1] =obj[temp1[i]].firstName;
        table[i][2] = obj[temp1[i]].lastName;
        table[i][3] = DateToInt(obj[temp1[i]].dateOfBirth);
        table[i][4] = obj[temp1[i]].function;
        table[i][5] = obj[temp1[i]].experience;

    }

//converting dateOfBirth from integer back to date format

    for(i=0;i<length;i++) {
        temp[i] = new Date(table[i][3]).toLocaleString();
    }

//Adding sorted elements to table
    if(pagination==false) {


//filterByID is set to true when some ID filter is selected (same for other filters)
        if(filterByID == true) {

            for (i = 0; i < length; i++) {
                if(table[i][0]>=start && table[i][0] <= end) {
                   printTable(i,temp[i]);
                }
            }
        }
        else if(filterByExperience ==true) {
            for (i = 0; i < length; i++) {
                if(table[i][5]>=start && table[i][5] <= end) {
                    printTable(i,temp[i]);
                }
            }
        }

        else if(filterByFirstName == true) {
            var x= [];
            for(var i=0;i<length;i++) x[i]= table[i][1].substring(0,1); //getting first letter

            for (i = 0; i < length; i++) {
                switch(sort_names) {
                    case 1: {
                        if (x[i] <= "H") {
                            printTable(i,temp[i]);
                        }
                    }
                        break;
                    case 2: {
                        if (x[i] > "H" && x[i] <= "R") {
                            printTable(i,temp[i]);
                        }
                        break;
                    }
                    case 3: {
                        if (x[i] > "R" && x[i] <= "Z") {
                            printTable(i,temp[i]);
                        }
                        break;
                    }
                }

            }
        }
        else if(filterBySecondName == true) {
            var x= [];
            for(var i=0;i<length;i++) x[i]= table[i][2].substring(0,1); //getting first letter

            for (i = 0; i < length; i++) {
                switch(sort_names) {
                    case 1: {
                        if (x[i] <= "H") {
                            printTable(i,temp[i]);
                        }
                    }
                        break;
                    case 2: {
                        if (x[i] > "H" && x[i] <= "R") {
                            printTable(i,temp[i]);
                        }
                        break;
                    }
                    case 3: {
                        if (x[i] > "R" && x[i] <= "Z") {
                            printTable(i,temp[i]);
                        }
                        break;
                    }
                }

            }
        }
        else if(filterByFunction == true) {
            for (i = 0; i < length; i++) {
                switch (sort_names) {
                    case 1: {
                        if (table[i][4] == obj[0].function) {//kamerdyner
                            printTable(i, temp[i]);
                        }
                    }
                        break;
                    case 2: {
                        if (table[i][4] == obj[5].function) {//kucharka
                            printTable(i, temp[i]);
                        }
                        break;
                    }
                    case 3: {
                        if (table[i][4] == obj[9].function) {//lokaj
                            printTable(i, temp[i]);
                        }
                        break;
                    }
                    case 4: {
                        if (table[i][4] == obj[1].function) {//pokojowka
                            printTable(i, temp[i]);
                        }
                        break;
                    }
                }
            }
        }
        else if(filterByDate == true) {
            filtrDate();
            resetDateFilter();
        }
        else {

            for (i = 0; i < length; i++) {
                printTable(i,temp[i]);

            }
        }


    }
    else
    showOnPage();//if pagination==true

}
//first print of table
function initSort()
{
    sort_by=0;
    increasing=true;
    sort();
}

//Function to show "howManyOnSite" elements on page (pagination)
 function showOnPage()
 {
     if(pagination==true) {
         //deleting previous values from table
         $("#nameTable > tbody").empty();

         //protection from showing too many pages
         if (pageNum < 0) pageNum++;
         if (pageNum > table.length / howManyOnSite) pageNum--;

         for (var i = 0; i < howManyOnSite; i++) {
             var index = i + pageNum * howManyOnSite;
             if (index < table.length) //protection from getting non existing index of array
             {
                 $("#nameTable").append([
                     '<tr>',
                     "<td><b>" + table[index][0] + "</b></td>",
                     "<td><b>" + table[index][1] + "</b></td>",
                     "<td><b>" + table[index][2] + "</b></td>",
                     "<td><b>" + temp[index] + "</b></td>",
                     "<td><b>" + table[index][4] + "</b></td>",
                     "<td><b>" + table[index][5] + "</b></td>",
                     '</tr>'
                 ].join(''));
             }
         }
         document.getElementById('demo').innerHTML = "Page number: " + pageNum;
     }
 }
