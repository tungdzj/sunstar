

//Category Model
function CategoryModel(data) {
    this.id = data.id;
    this.name = data.name;
    this.parentId = data.parentId;
    this.image = data.image != null ? data.image : 'images/default.png';
    this.child = [];
}


function PromotionModel(data) {
    this.id = data.id;
    this.name = data.name;
    this.content = store.correctLink(data.content);
    this.level = data.level;
    this.endDate = data.endDate
    //var t = Math.abs(Math.round((new Date(this.endDate) - new Date()) / 1000));
    
    var f = new XDate(Date.now());
    
    this.endDate = this.endDate.replace(':', '-');
    this.endDate = this.endDate.replace(':', '-');
    this.endDate = this.endDate.replace(':', '-');
    this.endDate = this.endDate.replace(' ', '-');
    var arrt = this.endDate.split('-');
    var t = new XDate(Number(arrt[0]),Number(arrt[1]),Number(arrt[2]), Number(arrt[3]), Number(arrt[4]),Number(arrt[5]));
    var time = Math.abs(Math.floor(f.diffSeconds(t)));
    counttimer[this.id + ''] = time;
    console.log(time);
    this.image = data.image;
    this.categoryId = data.categoryId;
    this.type = 1;
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
    if (data == null) {
        return;
    }

    this.parentId = data.parentId;
    this.id = data.id;
    this.quantity = data.quantity;
}
