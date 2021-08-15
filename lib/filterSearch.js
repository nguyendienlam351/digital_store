const filterSearch = ({router, page, type,search}) => {
    const path = router.pathname;
    const query = router.query;

    if(page) query.page = page;
    if(type) query.type = type;
    if(search) query.search = search;

    router.push({
        pathname: path,
        query: query
    })
}

export default filterSearch