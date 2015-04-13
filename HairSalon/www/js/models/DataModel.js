

//Category Model
function CategoryModel(data) {
    this.id = data.id;
    this.name = data.name;
    this.parentId = data.parentId;
    this.image = data.image != null ? data.image : 'images/default.png';
    this.child = [];
    this.show = data['show-in-homepage'];
}


function PromotionModel(data) {
    this.id = data.id;
    this.name = data.name;
    this.content = store.correctLink(data.content);
    this.level = data.level;
    this.image = data.image;
    this.categoryId = data.categoryId;
    this.type = 1;
    this.localId = data.localId;
    //time 
    this.endDate = data.datetime2;
    this.startDate = data.datetime1;
    var now = new Date();
    this.startDate = dateUtils.replaceAll(':', '-', this.startDate);
    this.startDate = dateUtils.replaceAll(' ', '-', this.startDate);
    var arrt = this.startDate.split('-');
    var timeStart = new Date(Number(arrt[0]), Number(arrt[1]) - 1, Number(arrt[2]), Number(arrt[3]), Number(arrt[4]), Number(arrt[5]));
    this.endDate = dateUtils.replaceAll(':', '-', this.endDate);
    this.endDate = dateUtils.replaceAll(' ', '-', this.endDate);
    var arrt = this.endDate.split('-');
    var timeEnd = new Date(Number(arrt[0]), Number(arrt[1]) - 1, Number(arrt[2]), Number(arrt[3]), Number(arrt[4]), Number(arrt[5]));
    
    this.timeToStart = Math.floor((timeStart.getTime() - now.getTime()) / 1000);
    this.timeToEnd = Math.floor((timeEnd.getTime() - now.getTime()) / 1000);
    this.status = 0;
}

function ItemModel(data) {
    this.id = data.id;
    this.name = data.name;
    this.image = data.image;
    this.content = data.description;
    this.price = data.price;
    this.parentId = data.categoryId;
    this.discount = data.discount;
    this.child = [];
    this.document = data.content;
}
//News Model

function NodeModel(data) {
    //default value
    this.id = 0;
    this.parentId = -1;
    this.child = [];
    this.type = 0;
    this.parent = null;
    this.appendChild = function (item) {
        this.child.push(item);
    }
    this.removeAllChild = function () {
        console.log("remove child");
        this.child.splice(0, this.child.length);
    }
    if (data == null) {
        return;
    }

    this.parentId = data.parentId;
    this.id = data.id;
    this.quantity = data.quantity;
}
