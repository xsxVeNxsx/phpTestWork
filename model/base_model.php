<?php

require_once "model/data_base.php";

$DB = new Data_Base();

class Base_Model
{
    protected  $table_name, $fields, $db;

    public function __construct($table_name, $fields)
    {
        global $DB;
        $this->table_name = $table_name;
        $this->fields = $fields;
        $this->db = $DB->db;
    }

    protected function glue_params($oper, $seporator, $keys)
    {
        $keys = array_map(function ($i) {return "$i = ?";}, $keys);
        return "$oper " . implode("$seporator", $keys);
    }

    public function get($params, $order)
    {
        $order_by = $where = "";
        if (isset($params))
            $where = $this->glue_params("WHERE", " AND ", array_intersect(array_keys($params),
                                                                                    array_merge($this->fields, ["id"])));
        if (isset($order))
            $order_by = "ORDER BY " . $order["field"] . "  " . $order["rule"];
        $q = $this->db->prepare("SELECT * FROM $this->table_name $where $order_by");
        $q->execute(array_values($params));
        return $q->fetchAll(PDO::FETCH_ASSOC);
    }

    public function add($params)
    {
        $vals = [];
        foreach ($this->fields as $value)
            array_push($vals, $params[$value]);
        $query = "INSERT INTO $this->table_name VALUES(''".str_repeat(",?", count($this->fields)).")";
        $this->db->prepare($query)->execute($vals);
    }

    public function edit($params)
    {
        $set = $this->glue_params("SET", ", ", array_keys($params["set"]));
        $where = $this->glue_params("WHERE", " AND ", array_keys($params["where"]));
        $vals = array_values($params["set"]) + array_values($params["where"]);
        $query = "UPDATE $this->table_name $set $where";
        $this->db->prepare($query)->execute($vals);
    }
}
