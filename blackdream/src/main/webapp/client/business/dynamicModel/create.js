define(
    ["business/module", "business/api"],
    function (module) {
        "use strict";

        module.controller("dynamicModelCreateController", [
            "$scope", "$routeParams", "location", "dynamicModelApi", "viewPage",
            function($scope, $routeParams, location, dynamicModelApi, viewPage){
                viewPage.setViewPageTitle("数据模型新建");
                var generatorId = $routeParams.generatorId;

                $scope.createRequest = {generatorId: generatorId,isRootChild:false,children:[],properties:[],association:[],predefinedAssociation:[]};

                $scope.resetNameScript = function(){
                    $scope.createRequest.hasScriptError = false;
                    if($scope.createRequest.nameCascadeScript){
                        try{
                            $scope.createRequest.cascadeFunction = new Function("$property", $scope.createRequest.nameCascadeScript);
                        }
                        catch (e){
                            $scope.createRequest.hasScriptError = true;
                        }
                    }
                };

                $scope.childrenControl = {
                    $checkedSelf:false
                };
                dynamicModelApi.query({generatorId:generatorId}).success(function(children){
                    $scope.childrenControl.children = children;
                });

                $scope.create = function(){
                    for(var i = 0 ; i < $scope.childrenControl.children.length ; i++){
                        var child = $scope.childrenControl.children[i];
                        if(child.$checked){
                            $scope.createRequest.children.push(child.id);
                        }
                    }
                    if($scope.childrenControl.$checkedSelf){
                        $scope.createRequest.children.push(0);
                    }
                    dynamicModelApi.create({
                        generatorId:generatorId,
                        name: $scope.createRequest.name,
                        nameCascadeScript:$scope.createRequest.nameCascadeScript,
                        nameViewWidth:$scope.createRequest.nameViewWidth,
                        nameValidator:$scope.createRequest.nameValidator,
                        icon: $scope.createRequest.icon,
                        isRootChild: $scope.createRequest.isRootChild,
                        children: $scope.createRequest.children,
                        properties: $scope.createRequest.properties,
                        association: $scope.createRequest.association,
                        predefinedAssociation: $scope.predefinedAssociationControl.format($scope.createRequest.predefinedAssociation)
                    }).success(function(){
                        location.go("/business/dynamicModel/manage/" + generatorId);
                    });
                };

                $scope.iconControl = {
                    $error: {},
                    icons:[
                        "asterisk", "plus", "euro", "eur", "minus", "cloud", "envelope", "pencil", "glass", "music", "search", "heart", "star", "star-empty", "user", "film",
                        "th-large", "th", "th-list", "ok", "remove", "zoom-in", "zoom-out", "off", "signal", "cog", "trash", "home", "file", "time", "road", "download-alt",
                        "download", "upload", "inbox", "play-circle", "repeat", "refresh", "list-alt", "lock", "flag", "headphones", "volume-off", "volume-down", "volume-up", "qrcode", "barcode", "tag",
                        "tags", "book", "bookmark", "print", "camera", "font", "bold", "italic", "text-height", "text-width", "align-left", "align-center", "align-right", "align-justify", "list", "indent-left",
                        "indent-right", "facetime-video", "picture", "map-marker", "adjust", "tint", "edit", "share", "check", "move", "step-backward", "fast-backward", "backward", "play", "pause", "stop",
                        "forward", "fast-forward", "step-forward", "eject", "chevron-left", "chevron-right", "plus-sign", "minus-sign", "remove-sign", "ok-sign", "question-sign", "info-sign", "screenshot", "remove-circle", "ok-circle", "ban-circle",
                        "arrow-left", "arrow-right", "arrow-up", "arrow-down", "share-alt", "resize-full", "resize-small", "exclamation-sign", "gift", "leaf", "fire", "eye-open", "eye-close", "warning-sign", "plane",
                        "calendar", "random", "comment", "magnet", "chevron-up", "chevron-down", "retweet", "shopping-cart", "folder-close", "folder-open", "resize-vertical", "resize-horizontal", "hdd", "bullhorn",
                        "bell", "certificate", "thumbs-up", "thumbs-down", "hand-right", "hand-left", "hand-up", "hand-down", "circle-arrow-right", "circle-arrow-left", "circle-arrow-up", "circle-arrow-down", "globe",
                        "wrench", "tasks", "filter", "briefcase", "fullscreen", "dashboard", "paperclip", "heart-empty", "link", "phone", "pushpin", "usd", "gbp", "sort", "sort-by-alphabet", "sort-by-alphabet-alt",
                        "sort-by-order", "sort-by-order-alt", "sort-by-attributes", "sort-by-attributes-alt", "unchecked", "expand", "collapse-down", "collapse-up", "log-in", "flash", "log-out", "new-window",
                        "record", "save", "open", "saved", "import", "export", "send", "floppy-disk", "floppy-saved", "floppy-remove", "floppy-save", "floppy-open", "credit-card", "transfer", "cutlery",
                        "header", "compressed", "earphone", "phone-alt", "tower", "stats", "sd-video", "hd-video", "subtitles", "sound-stereo", "sound-dolby", "sound-5-1", "sound-6-1", "sound-7-1", "copyright-mark",
                        "registration-mark", "cloud-download", "cloud-upload", "tree-conifer", "tree-deciduous", "cd", "save-file", "open-file", "level-up", "copy", "paste", "alert", "equalizer", "king", "queen",
                        "pawn", "bishop", "knight", "baby-formula", "tent", "blackboard", "bed", "apple", "erase", "hourglass", "lamp", "duplicate", "piggy-bank", "scissors", "bitcoin", "btc", "xbt", "yen",
                        "jpy", "ruble", "rub", "scale", "ice-lolly", "ice-lolly-tasted", "education", "option-horizontal", "option-vertical", "menu-hamburger", "modal-window", "oil", "grain", "sunglasses", "text-size",
                        "text-color", "text-background", "object-align-top", "object-align-bottom", "object-align-horizontal", "object-align-left", "object-align-vertical", "object-align-right", "triangle-right", "triangle-left",
                        "triangle-bottom", "triangle-top", "console", "superscript", "subscript", "menu-left", "menu-right", "menu-down", "menu-up"
                    ],
                    selectedItem: null,
                    clear: function(){
                        $scope.iconControl.selectedItem = null;
                        $scope.iconControl.$error = {};
                    },
                    select: function(icon){
                        $scope.iconControl.clear();
                        $scope.createRequest.icon = icon;
                        $scope.iconControl.selectedItem = icon;
                        $scope.iconControl.$error = null;
                    }
                };

                $scope.hashKey = function(entity){
                    return entity.$$hashKey.split(":")[1];
                };

                $scope.resetInitScript = function(property){
                    property.hasInitScriptError = false;
                    if(property.initScript){
                        try{
                            property.initFunction = new Function("$property", property.initScript);
                        }
                        catch (e){
                            property.hasInitScriptError = true;
                        }
                    }
                };

                $scope.resetScript = function(property){
                    property.hasScriptError = false;
                    if(property.cascadeScript){
                        try{
                            property.cascadeFunction = new Function("$property", property.cascadeScript);
                        }
                        catch (e){
                            property.hasScriptError = true;
                        }
                    }
                };

                $scope.validateMessages = {
                    name:{
                        required:"必输项",
                        maxlength:"最长20位"
                    }
                };

                $scope.getMessage = function(field, $error, validateMessages){
                    if(!validateMessages)
                        return;
                    for(var k in $error){
                        return validateMessages[field][k];
                    }
                };

                $scope.associationMessages = {};

                $scope.resetMessage = function(property){
                    var validator = property.validator;
                    if(validator){
                        var fieldMessages = $scope.associationMessages[property.name] = {};
                        if(validator.required){
                            fieldMessages.required = "必输项";
                        }
                        if(validator.min != null && validator.min != undefined){
                            fieldMessages.min = "最小" + validator.min;
                        }
                        if(validator.max != null && validator.max != undefined){
                            fieldMessages.max = "最大" + validator.max;
                        }
                        if(validator.minlength != null && validator.minlength != undefined){
                            fieldMessages.minlength = "最短" + validator.minlength + "位";
                        }
                        if(validator.maxlength != null && validator.maxlength != undefined){
                            fieldMessages.maxlength = "最长" + validator.maxlength + "位";
                        }
                        if(validator.pattern != null && validator.pattern != undefined){
                            fieldMessages.pattern = validator.patternTooltip || "格式不匹配" + validator.pattern;
                        }
                    }
                };

                $scope.propertyControl = {
                    typeOptions:[
                        { type: "Boolean" , name:"布尔型"},
                        { type: "Long" , name:"整数型"},
                        { type: "Double" , name:"浮点型"},
                        { type: "String" , name:"字符串型"},
                        { type: "Date", name:"日期型" },
                        { type: "Enum" , name:"枚举型"},
                        { type: "Model", name:"数据模型" }
                    ],
                    validatorRules:{
                        Boolean:{required:true},
                        Long:{required:true,min:true,max:true,minlength:true,maxlength:true,pattern:true},
                        Double:{required:true,min:true,max:true,minlength:true,maxlength:true,pattern:true},
                        String:{required:true,minlength:true,maxlength:true,pattern:true},
                        Date:{required:true},
                        Enum:{required:true},
                        Model:{required:true}
                    },
                    addOptionalValue:function(property, $event){
                        if($event.keyCode == 13){
                            if(property.optionalValue){
                                if(!property.optionalValues){
                                    property.optionalValues = [];
                                }
                                property.optionalValues.push(property.optionalValue);
                                property.optionalValue = null;
                            }
                        }
                    },
                    removeOptionalValue: function(property, $index){
                        property.optionalValues.splice($index, 1);
                    },
                    changeType:function(property){
                        property.defaultValue = null;
                        property.optionalValues = null;
                        property.validator = {};
                    },
                    validateMessages: {
                        group:{
                            maxlength:"最长20位"
                        },
                        name:{
                            required:"必输项",
                            pattern:"非数字开头32位长度字母或数字"
                        },
                        label:{
                            required:"必输项",
                            maxlength:"最长20位"
                        },
                        type:{
                            required:"必输项"
                        },
                        viewWidth:{
                            required:"必输项",
                            min:"最小1",
                            max:"最大1000",
                            number:"数字类型"
                        }
                    }
                };

                $scope.propertiesControl = {
                    sortableOptions:{
                        update: function(e, ui) {
                        },
                        stop: function(e, ui) {
                        }
                    },
                    add:function() {
                        $scope.createRequest.properties.push({});
                    },
                    delete:function(entity, index) {
                        $scope.createRequest.properties.splice(index, 1);
                    }
                };

                $scope.associationControl = {
                    sortableOptions:{
                        update: function(e, ui) {

                        },
                        stop: function(e, ui) {
                            $scope.resetHead();
                        }
                    },
                    add:function() {
                        $scope.createRequest.association.push({});
                        $scope.resetHead();
                    },
                    delete:function(entity, index) {
                        $scope.createRequest.association.splice(index, 1);
                        $scope.resetHead();
                    }
                };

                $scope.resetHead = function(by$hide){
                    var tableHead = $scope.predefinedAssociationControl.tableHead;
                    tableHead.groupHeads.length = 0;
                    tableHead.heads.length = 0;
                    $scope.predefinedAssociationControl.hasHideCols = false;
                    for(var j = 0 ; j < $scope.createRequest.association.length ; j++){
                        var property = $scope.createRequest.association[j];
                        if(!by$hide){
                            property.$hide = property.canHide;
                        }
                        if(property.canHide){
                            $scope.predefinedAssociationControl.hasHideCols = true;
                        }
                        if(property.$hide){
                            continue;
                        }
                        var group = property.group;
                        if(!group){
                            tableHead.groupHeads.push(property);
                        }
                        else{
                            var prevHead = tableHead.groupHeads[tableHead.groupHeads.length - 1];
                            if(!prevHead || group != prevHead.group){
                                tableHead.groupHeads.push({group:group, span:1});
                            }
                            if(prevHead && group == prevHead.group){
                                prevHead.span++;
                            }
                            tableHead.heads.push(property);
                        }
                    }
                };

                $scope.predefinedAssociationControl = {
                    tableHead:{
                        groupHeads:[],
                        heads:[]
                    },
                    sortableOptions:{
                        update: function(e, ui) {

                        },
                        stop: function(e, ui) {

                        }
                    },
                    hasHideCols:false,
                    hideCols:true,
                    showOrHideCols: function(){
                        $scope.predefinedAssociationControl.hideCols = !$scope.predefinedAssociationControl.hideCols;
                        for(var j = 0 ; j < $scope.createRequest.association.length ; j++){
                            var property = $scope.createRequest.association[j];
                            if(property.canHide){
                                property.$hide = $scope.predefinedAssociationControl.hideCols;
                            }
                        }
                        $scope.resetHead(true);
                    },
                    add:function() {
                        var properties = {};
                        for(var i = 0 ; i < $scope.createRequest.association.length ; i++){
                            var property = $scope.createRequest.association[i];
                            if(property.defaultValue != null){
                                properties[property.name] = property.defaultValue;
                            }
                        }
                        for(var i = 0 ; i < $scope.createRequest.association.length ; i++){
                            var property = $scope.createRequest.association[i];
                            if(property.initScript){
                                property.initFunction = new Function("$property", property.initScript);
                                property.initFunction(properties);
                            }
                        }
                        $scope.createRequest.predefinedAssociation.push(properties);
                    },
                    delete:function(entity, index) {
                        $scope.createRequest.predefinedAssociation.splice(index, 1);
                    },
                    format:function(predefinedAssociation){
                        var association = $scope.createRequest.association;
                        var associationKeys = {dateTypeKeys:{},dataModelTypeKeys:{}};
                        for(var i = 0 ; i < association.length ; i++){
                            var prop = association[i];
                            if(prop.type == "Date"){
                                associationKeys.dateTypeKeys[prop.name] = true;
                            }
                            else if(prop.type == "Model"){
                                associationKeys.dataModelTypeKeys[prop.name] = true;
                            }
                            else{
                                //
                            }
                        }
                        var newPredefinedAssociation = [];
                        for(var i = 0 ; i < predefinedAssociation.length ; i++){
                            var property = predefinedAssociation[i];
                            var newProperty = {};
                            for(var k in property){
                                if(property[k] == undefined || property[k] == null){
                                    continue;
                                }
                                if(k in associationKeys.dateTypeKeys){
                                    newProperty[k] = new Date(property[k]).getTime();
                                }
                                else if(k in associationKeys.dataModelTypeKeys){
                                    newProperty[k] = property[k].id;
                                }
                                else{
                                    newProperty[k] = property[k];
                                }
                            }
                            newPredefinedAssociation.push(newProperty);
                        }
                        return newPredefinedAssociation;
                    }
                }

            }
        ]);
    }
);
