<?php

require_once "model/data_base.php";

$DB = new Data_Base();

class Base_Model
{
    protected $table_name, $fields, $db;
    protected $order = ["field" => "id", "rule" => "DESC"];

    public function __construct($table_name, $fields)
    {
        global $DB;
        $this->table_name = $table_name;
        $this->fields = $fields;
        $this->db = $DB->db;
    }

    private function glue_params($oper, $seporator, $keys)
    {
        $keys = array_map(function ($i) {return "$i = ?";}, $keys);
        return "$oper " . implode("$seporator", $keys);
    }

    private function limit($pagination)
    {
        if (!isset($pagination["page_size"]))
            return "";
        $start = ($pagination["page"] - 1) * $pagination["page_size"];
        return "LIMIT $start, ".$pagination["page_size"];
    }

    private function query($select, $pdo_method, $params = [], $order = [], $pagination = [])
    {
        $where = "";
        if (count($params))
            $where = $this->glue_params("
                WHERE",
                " AND ",
                array_intersect(array_keys($params),
                    array_merge($this->fields, ["id"]))
            );
        if (count($order) && isset($order["order_field"]))
        {
            $order["field"] = $order["order_field"];
            $order["rule"] = isset($order["order_rule"]) ? $order["order_rule"] : "ASC";
        }
        else
            $order = $this->order;
        $order_by = "ORDER BY " . $order["field"] . " " . $order["rule"];
        $limit = $pagination == [] ? "" : $this->limit($pagination);
        $q = $this->db->prepare("$select FROM $this->table_name $where $order_by $limit");
        $q->execute(array_values($params));
        return $q->fetchAll($pdo_method);
    }

    public function get($params = [], $order = [], $pagination = [])
    {
        $count = intval($this->count($params)[0]);
        if (!isset($pagination["page"]) || $pagination["page"] > ceil($count / intval($pagination["page_size"])))
            $pagination["page"] = 1;
        $data = $this->query("SELECT *" , PDO::FETCH_ASSOC, $params, $order, $pagination);
        return ["data" => $data, "count" => $count, "page" => $pagination["page"]];
    }

    public function count($params = [])
    {
        return $this->query("SELECT count(*)" , PDO::FETCH_COLUMN, $params);
    }

    public function add($params)
    {
        $vals = [];
        foreach ($this->fields as $value)
            array_push($vals, isset($params[$value]) ? $params[$value] : "");
        $query = "INSERT INTO $this->table_name VALUES(''".str_repeat(",?", count($this->fields)).")";
        $this->db->prepare($query)->execute($vals);
    }

    public function edit($params)
    {
        $changing_fields = array_intersect(array_keys($params["set"]), $this->fields);
        $set = $this->glue_params("SET", ", ", $changing_fields);
        $where = $this->glue_params("WHERE", " AND ", array_keys($params["where"]));
        $vals = [];
        foreach ($changing_fields as $i)
            array_push($vals, ($params["set"][$i]));
        $query = "UPDATE $this->table_name $set $where";
        $this->db->prepare($query)->execute(array_merge($vals, array_values($params["where"])));
    }
}
