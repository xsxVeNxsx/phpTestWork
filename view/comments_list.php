<div class="btn-group" role="group" aria-label="Order" id="order_pagination_fields">
    <button type="button" class="btn btn-secondary" name="author">Name</button>
    <button type="button" class="btn btn-secondary" name="email">Email</button>
    <button type="button" class="btn btn-secondary" id="desc_order_field" name="date">Date ↓</button>

    <div id="pagination_fields">
        <ul class="pagination float-left" id="page">
            <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item active page_number"><a class="page-link" href="#">1</a></li>
            <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
        <select class="form-control float-right" id="page_size">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
        </select>
    </div>
</div>
<div id="comments_block" class="container <?php if (!isset($is_admin)) echo "pre-scrollable container"?>">
</div>
