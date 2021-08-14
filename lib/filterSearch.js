const filterSearch = ({router, page}) => {
    const path = router.pathname;
    const query = router.query;

    if(page) query.page = page;

    router.push({
        pathname: path,
        query: query
    })
}

export default filterSearch