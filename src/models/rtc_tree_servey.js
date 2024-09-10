const { DataTypes } = require('sequelize');
import sequelize from '../database/connectDb';

const Trees_Servey = sequelize.define('temp_household_trees',{
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false
    },
    __kp_house_trees: {
        type: DataTypes.STRING,
        allowNull: false,
    },    
    _kf_Staff: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    _kf_User: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    _kf_Station: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    _kf_Supplier: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CW_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Group_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    farmer_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    farmer_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    national_ID: {
        type: DataTypes.STRING,
        allowNull: false,
    },    
    Phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Year_Birth:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Gender:{
        type: DataTypes.STRING,
        allowNull: false
    },
    child_year_1_20:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    child_year_20_30:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    Trees:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    Trees_Producing:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    Trees_year_less_15:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    Trees_year_greater_15:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    coffee_plot: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    last_season_production:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    current_season_production:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    nitrogen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    natural_shade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shade_trees: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    other_crops_coffee_farm:{
        type: DataTypes.STRING,
        allowNull:false
    },
    other_crops_farm:{
        type: DataTypes.STRING,
        allowNull:false
    },
    longitude:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    latitude:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    seedling_last_3_year:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    received_tree_3_y:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    seedling_last_2_year:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    received_tree_2_y:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    seedling_last_year:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    received_tree_l_y:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    rejuvenation_last_year:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    rejuvenated_tree:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    rejuvenation_current_year:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    rejuvenated_tree:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    status:{
        type: DataTypes.ENUM('new','verified','Approved'),
        allowNull: false,
        defaultValue:'new'
    },
    Mulching:{
        type: DataTypes.STRING,
        allowNull:false
    },
    compost_heap:{
        type: DataTypes.STRING,
        allowNull:false
    },
    pruning:{
        type: DataTypes.STRING,
        allowNull:false
    },
    trenches:{
        type: DataTypes.STRING,
        allowNull:false
    },
    rejuvenation:{
        type: DataTypes.STRING,
        allowNull:false
    },
    weed_control:{
        type: DataTypes.STRING,
        allowNull:false
    },
    traps:{
        type: DataTypes.STRING,
        allowNull:false
    },
    contour_grass:{
        type: DataTypes.STRING,
        allowNull:false
    },
    inorganic_waste:{
        type: DataTypes.STRING,
        allowNull:false
    },
    leaf_rust:{
        type: DataTypes.STRING,
        allowNull:false
    },
    berry_borer:{
        type: DataTypes.STRING,
        allowNull:false
    },
    berry_desease:{
        type: DataTypes.STRING,
        allowNull:false
    },
    white_stem_borer:{
        type: DataTypes.STRING,
        allowNull:false
    },
    scare_mealy_bug:{
        type: DataTypes.STRING,
        allowNull:false
    },
    antestia:{
        type: DataTypes.STRING,
        allowNull:false
    },
    leaf_miner:{
        type: DataTypes.STRING,
        allowNull:false
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:true
    },
});
module.exports = Trees_Servey;