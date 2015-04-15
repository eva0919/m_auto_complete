(function() {




    // variable zone
    var data = getData();  // if want use another data , change function
    var temp = [];
    var lastNumber = 0;
    var lastString = '';
    var elements = document.getElementsByClassName('auto-complete');
    var auto_content_elements = document.getElementById('auto-content');
    var createMustDiv = function() {
        var sp = document.createElement("div");
        var a = document.createAttribute("id");
        a.value = "complete-tag";
        sp.setAttributeNode(a);
        elements[0].parentNode.appendChild(sp);
        sp.setAttribute("style", "visibility:hidden");
    }();
    // funciton zone
    // show candidate 
    var show_tag = function(data) {
            if (data.length > 0) {
                var elements = document.getElementById('complete-tag');
                elements.innerHTML = "";
                for (var i = 0; i < data.length; i++) {
                    var newdiv = document.createElement("div");
                    var newContent = document.createTextNode(data[i]);
                    newdiv.appendChild(newContent);
                    newdiv.setAttribute("class", "tag-item");
                    if (i == 0) {
                        newdiv.setAttribute('class', newdiv.getAttribute('class') + ' tag-selected');
                    }
                    newdiv.onmouseover = tag_mouse_hover_function;
                    newdiv.onclick = tag_mouse_click_function;
                    elements.appendChild(newdiv);
                    delete newdiv;
                    delete newContent;
                }
                elements.setAttribute("style", "visibility:block")
            } else {
                document.getElementById('complete-tag').innerHTML = "";
                document.getElementById('complete-tag').setAttribute("style", "visibility:hidden");
            }
        }
        // main function about key handler 
        // that implement input auto complete 
    var auto_complete_function = function(keyCode, targetObject) {
        if (keyCode == 13 || keyCode == 32 || (keyCode > 36 && keyCode < 41)) {
            if (temp.length > 0) {
                if (keyCode == 13 || keyCode == 32) {
                    // enter or space
                    tag_mouse_click_function();
                } else if (keyCode == 38) {
                    // arrow up
                    var complete_tag_elements = document.getElementsByClassName('tag-item');
                    for (var i = 0; i < complete_tag_elements.length; i++) {
                        var class_attribute = complete_tag_elements[i].getAttribute('class');
                        if (class_attribute.indexOf('tag-selected') >= 0 && i > 0) {
                            complete_tag_elements[i].setAttribute('class', complete_tag_elements[i].getAttribute('class').replace(' tag-selected', ''));
                            complete_tag_elements[i - 1].setAttribute('class', complete_tag_elements[i - 1].getAttribute('class') + ' tag-selected');
                        }
                    }
                } else if (keyCode == 40) {
                    // arrow down
                    var complete_tag_elements = document.getElementsByClassName('tag-item');
                    var find_num = -1;
                    for (var i = 0; i < complete_tag_elements.length; i++) {
                        var class_attribute = complete_tag_elements[i].getAttribute('class');
                        if (class_attribute.indexOf('tag-selected') >= 0 && i < complete_tag_elements.length - 1) {
                            find_num = i;
                            // complete_tag_elements[i].setAttribute('class', complete_tag_elements[i].getAttribute('class').replace(' tag-selected', ''));
                            // complete_tag_elements[i + 1].setAttribute('class', complete_tag_elements[i + 1].getAttribute('class') + ' tag-selected');
                        }

                    }
                    if (find_num > -1) {
                        complete_tag_elements[find_num].setAttribute('class', complete_tag_elements[find_num].getAttribute('class').replace(' tag-selected', ''));
                        complete_tag_elements[find_num + 1].setAttribute('class', complete_tag_elements[find_num + 1].getAttribute('class') + ' tag-selected');
                    }
                }
            } else {
                // press enter
                if (keyCode == 13) {
                    var complete_block_elements = document.getElementsByClassName('complete-block');
                    if (complete_block_elements.length > 0) {
                        // do submit function
                        do_submit(complete_block_elements);
                    }
                }
            }
        } else {
            var str = targetObject.value;
            if (str.length == 1) {
                if (str in data) {
                    temp = data[str];
                } else {
                    temp = [];
                }
                show_tag(temp);
            } else if (temp.length > 0 && str.length > 1) {
                temp2 = [];
                for (var ind = 0; ind < temp.length; ind++) {
                    if (temp[ind].indexOf(str) == 0) {
                        temp2.push(temp[ind])
                    }
                }
                temp = temp2;
                delete temp2;
                show_tag(temp);
            } else if (lastNumber > str.length && str.length > 1 && temp.length == 0) {
                if (str[0] in data) {
                    temp = data[str[0]];
                    temp2 = [];
                    for (var ind = 0; ind < temp.length; ind++) {
                        if (temp[ind].indexOf(str) == 0) {
                            temp2.push(temp[ind])
                        }
                    }
                    temp = temp2;
                    delete temp2;
                } else {
                    temp = [];
                }
                show_tag(temp);
            } else if (str.indexOf(lastString) < 0 && temp.length == 0) {
                if (str[0] in data) {
                    temp = data[str[0]];
                    temp2 = [];
                    for (var ind = 0; ind < temp.length; ind++) {
                        if (temp[ind].indexOf(str) == 0) {
                            temp2.push(temp[ind])
                        }
                    }
                    temp = temp2;
                    delete temp2;
                } else {
                    temp = [];
                }
                show_tag(temp);

            } else {
                temp = [];
                show_tag(temp);
            }
            // this.value = ''
            lastNumber = str.length;
            lastString = str;
        }
    }
    var do_submit = function(data) {
        my_submint(data);
        remove_all(data);
    }
    var my_submint = function(data) {
        var text = 'You tag :';
        for (var i = 0; i < data.length; i++) {
            text = text + ' #' + data[i].firstChild.textContent;
        }
        alert(text);
    }
    var remove_all = function(data) {
        for (var i = data.length - 1; i >= 0; i--) {
            data[i].parentNode.removeChild(data[i]);
        }
    }
    var tag_remove_buttion_function = function() {
        var parent = this.parentNode;
        parent.parentNode.removeChild(parent);
    }
    var tag_mouse_hover_function = function() {
        var selected_elements = document.getElementsByClassName('tag-selected')[0];
        selected_elements.setAttribute('class', selected_elements.getAttribute('class').replace(' tag-selected', ''));
        this.setAttribute('class', this.getAttribute('class') + ' tag-selected');
    }
    var tag_mouse_click_function = function() {
            var targetObject = document.getElementsByClassName('auto-complete')[0];
            var tag_selected_value = document.getElementsByClassName('tag-selected')[0].textContent
            var sp = document.createElement("div");
            sp.setAttribute('class', 'complete-block');
            var text = document.createTextNode(tag_selected_value);
            sp.appendChild(text);
            var new_span = document.createElement("span");
            new_span.setAttribute('class', 'complete-block-span');
            new_span.textContent = 'x';
            new_span.onclick = tag_remove_buttion_function;
            sp.appendChild(new_span);
            targetObject.parentNode.parentNode.insertBefore(sp, targetObject.parentNode);
            targetObject.value = "";
            temp = [];
            show_tag(temp);
        }
        // main logic zone
        // bind input(.auto-complete) key event
    for (var i = 0; i < elements.length; i++) {
        // bind auto complete funciton
        elements[i].addEventListener('keyup', function() {
            auto_complete_function(event.keyCode, this);
        });
        // bind function that stop some default key event like arrow
        elements[i].addEventListener('keydown', function() {
            var keyCode = event.keyCode;
            if (temp.length > 0 && (keyCode == 13 || keyCode == 32 || keyCode == 38 || keyCode == 40)) {
                event.preventDefault();
            } else if (keyCode == 8 && this.value.length <= 0) {
                event.preventDefault();
                var block = document.getElementsByClassName('complete-block');
                if (block.length > 0) {
                    var last_block = block[block.length - 1];
                    last_block.parentNode.removeChild(last_block);
                }
            }
        })
    }
    // bind for click div block and input can invoke focus.
    auto_content_elements.addEventListener('click', function() {
        this.querySelector('.auto-complete').focus();
    });


    // default data
    function getData() {
        var data = {
            "A": ["Abidjan", "Accra", "Addis_Ababa", "Algiers", "Asmara", "Adak", "Anchorage", "Anguilla", "Antigua", "Araguaina", "Argentina/Buenos_Aires", "Argentina/Catamarca", "Argentina/Comodoro_Rivadavia", "Argentina/Cordoba", "Argentina/Jujuy", "Argentina/La_Rioja", "Argentina/Mendoza", "Argentina/Rio_Gallegos", "Argentina/Salta", "Argentina/San_Juan", "Argentina/San_Luis", "Argentina/Tucuman", "Argentina/Ushuaia", "Aruba", "Asuncion", "Atikokan", "Atka", "Aden", "Almaty", "Amman", "Anadyr", "Aqtau", "Aqtobe", "Ashgabat", "Ashkhabad", "Azores", "Adelaide", "Amsterdam", "Andorra", "Athens", "Antananarivo", "Apia", "Auckland"],
            "B": ["Bamako", "Bangui", "Banjul", "Bissau", "Blantyre", "Brazzaville", "Bujumbura", "Bahia", "Bahia_Banderas", "Barbados", "Belem", "Belize", "Blanc-Sablon", "Boa_Vista", "Bogota", "Boise", "Brasilia", "Baghdad", "Bahrain", "Baku", "Bangkok", "Beirut", "Bishkek", "Brunei", "Bermuda", "Brisbane", "Broken_Hill", "Belfast", "Belgrade", "Berlin", "Bratislava", "Brussels", "Bucharest", "Budapest"],
            "C": ["Cairo", "Casablanca", "Ceuta", "Conakry", "Cambridge_Bay", "Campo_Grande", "Cancun", "Caracas", "Cayenne", "Cayman", "Chicago", "Chihuahua", "Coral_Harbour", "Costa_Rica", "Creston", "Cuiaba", "Curacao", "Casey", "Choibalsan", "Chongqing", "Colombo", "Canary", "Cape_Verde", "Currie", "Chișinău", "Copenhagen", "Chagos", "Christmas", "Cocos", "Comoro", "Chatham", "Chuuk_Lagoon"],
            "D": ["Dakar", "Dar_es_Salaam", "Djibouti", "Douala", "Danmarkshavn", "Dawson", "Dawson_Creek", "Denver", "Detroit", "Dominica", "Davis", "DumontDUrville", "Damascus", "Dhaka", "Dili", "Dubai", "Dushanbe", "Darwin", "Dublin"],
            "E": ["El_Aaiún", "Edmonton", "Eirunepe", "El_Salvador", "Ensenada", "Eucla", "Easter", "Efate", "Enderbury"],
            "F": ["Freetown", "Fort_Wayne", "Fortaleza", "Faroe_Islands", "Fakaofo", "Fiji", "Funafuti"],
            "G": ["Gaborone", "Glace_Bay", "Godthab", "Goose_Bay", "Grand_Turk", "Grenada", "Guadeloupe", "Guatemala", "Guayaquil", "Guyana", "Gaza", "Gibraltar", "Guernsey", "Galápagos_Islands", "Gambier", "Guadalcanal", "Guam"],
            "H": ["Harare", "Halifax", "Havana", "Hermosillo", "Harbin", "Hebron", "Ho_Chi_Minh", "Hong_Kong", "Hovd", "Hobart", "Helsinki", "Honolulu"],
            "J": ["Johannesburg", "Juba", "Jamaica", "Juneau", "Jakarta", "Jayapura", "Jerusalem", "Jan_Mayen", "Jersey", "Johnston"],
            "K": ["Kampala", "Khartoum", "Kigali", "Kinshasa", "Kentucky/Louisville", "Kentucky/Monticello", "Knox_IN", "Kralendijk", "Kabul", "Kamchatka", "Karachi", "Kashgar", "Kathmandu", "Kolkata", "Krasnoyarsk", "Kuala_Lumpur", "Kuching", "Kuwait", "Kaliningrad", "Kiev", "Kerguelen", "Kiritimati", "Kosrae", "Kwajalein"],
            "L": ["Lagos", "Libreville", "Lomè", "Luanda", "Lubumbashi", "Lusaka", "La_Paz", "Lima", "Los_Angeles", "Louisville", "Lower_Princes", "Lindeman", "Lord_Howe", "Lisbon", "Ljubljana", "London", "Luxembourg"],
            "M": ["Malabo", "Maputo", "Maseru", "Mbabane", "Mogadishu", "Monrovia", "Maceio", "Managua", "Manaus", "Marigot", "Martinique", "Matamoros", "Mazatlan", "Menominee", "Merida", "Metlakatla", "Mexico_City", "Miquelon", "Moncton", "Monterrey", "Montevideo", "Montreal", "Montserrat", "Macquarie", "Mawson", "McMurdo", "Macau", "Magadan", "Makassar", "Manila", "Muscat", "Madeira", "Melbourne", "Madrid", "Malta", "Mariehamn", "Minsk", "Monaco", "Moscow", "Mahe", "Maldives", "Mauritius", "Mayotte", "Majuro", "Marquesas", "Midway"],
            "N": ["Nairobi", "N'djamena", "Niamey", "Nouakchott", "Nassau", "New_York", "Nipigon", "Nome", "Noronha", "North_Dakota/Beulah", "North_Dakota/Center", "North_Dakota/New_Salem", "Nicosia", "Novokuznetsk", "Novosibirsk", "Nicosia", "Nauru", "Niue", "Norfolk", "Nouméa"],
            "O": ["Ouagadougou", "Ojinaga", "Omsk", "Oral", "Oslo"],
            "P": ["Porto-Novo", "Panama", "Pangnirtung", "Paramaribo", "Phoenix", "Port-au-Prince", "Port_of_Spain", "Porto_Acre", "Porto_Velho", "Puerto_Rico", "Palmer", "Phnom_Penh", "Pontianak", "Pyongyang", "Perth", "Paris", "Podgorica", "Prague", "Pago_Pago", "Palau", "Pitcairn", "Pohnpei", "Ponape", "Port_Moresby"],
            "S": ["São_Tomé", "Santa_Isabel", "Santarem", "Santiago", "Santo_Domingo", "Sao_Paulo", "Scoresbysund", "Shiprock", "Sitka", "St_Barthelemy", "St_Johns", "St_Kitts", "St_Lucia", "St_Thomas", "St_Vincent", "Swift_Current", "South_Pole", "Syowa", "Saigon", "Sakhalin", "Samarkand", "Seoul", "Shanghai", "Singapore", "South_Georgia", "St_Helena", "Stanley", "Sydney", "Samara", "San_Marino", "Sarajevo", "Simferopol", "Skopje", "Sofia", "Stockholm", "Saipan", "Samoa"],
            "T": ["Timbuktu", "Tripoli", "Tunis", "Tegucigalpa", "Thule", "Thunder_Bay", "Tijuana", "Toronto", "Tortola", "Taipei", "Tashkent", "Tbilisi", "Tehran", "Tel_Aviv", "Thimphu", "Tokyo", "Tallinn", "Tirane", "Tiraspol", "Tahiti", "Tarawa", "Tongatapu"],
            "W": ["Windhoek", "Whitehorse", "Winnipeg", "Warsaw", "Wake", "Wallis"],
            "I": ["Indiana/Indianapolis", "Indiana/Knox", "Indiana/Marengo", "Indiana/Petersburg", "Indiana/Tell_City", "Indiana/Vevay", "Indiana/Vincennes", "Indiana/Winamac", "Indianapolis", "Inuvik", "Iqaluit", "Irkutsk", "Istanbul", "Isle_of_Man", "Istanbul"],
            "Q": ["Quito", "Qatar", "Qyzylorda"],
            "R": ["Rainy_River", "Rankin_Inlet", "Recife", "Regina", "Resolute", "Rio_Branco", "Rosario", "Rothera", "Rangoon", "Riyadh", "Reykjavik", "Riga", "Rome", "Reunion", "Rarotonga"],
            "V": ["Vancouver", "Virgin", "Vostok", "Vientiane", "Vladivostok", "Vaduz", "Vatican", "Vienna", "Vilnius", "Volgograd"],
            "Y": ["Yakutat", "Yellowknife", "Yakutsk", "Yekaterinburg", "Yerevan", "Yap"],
            "U": ["Ulan_Bator", "Uzhgorod"],
            "Ü": ["Ürümqi"],
            "Z": ["Zagreb", "Zaporozhye", "Zurich"]
        }
        return data
    }
})();
