var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/**
 * 账户表，有2种类型（用户和集体），之间用一张中间表联系起来，是多对多关系
 */
var AccountSchema = new Schema({
  name : {type : String, required : true, index : true, unique : true}, // 账户名字
  password : {type : String}, //账户密码
  base_email : {type : String, required : true, unique : true}, // 基本邮箱
  base_phone : {type : String}, // 基本电话
  last_name : {type : String}, // 姓
  first_name : {type : String}, // 名
  photo_path : {type : String}, // 头像地址
  create_time : {type : Date, 'default' : Date.now}, // 创建时间
  type : {type : Number, 'default' : 0}, //0是个人，1是集体
  qq : {type : Number},
  homepage : {type : String},
  addr : {type : String},
  card : {type : String},
  _contacts : [
    {type : ObjectId, ref : 'Contact'}
  ],
  creator_id : {type : ObjectId, ref : 'Account'},
  members : [
    {type : ObjectId, ref : 'Account'}
  ]
});


mongoose.model('Account', AccountSchema, 'accounts');
