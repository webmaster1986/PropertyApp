import React from 'react';
import './Pager.css';

const BASE_SHIFT = 0;
const TITLE_SHIFT = 1;

const TITLES = {
    first: 'First',
    prev: '\u00AB',
    prevSet: '...',
    nextSet: '...',
    next: '\u00BB',
    last: 'Last',
};

class Pager extends React.Component {

    getTitles = (key) => {
        return this.props.titles[key] || TITLES[key];
    }

    calcBlocks = () => {
        const props = this.props;
        const total = props.total;
        const blockSize = props.visiblePages;
        const current = props.current + TITLE_SHIFT;
        const blocks = Math.ceil(total / blockSize);
        const currBlock = Math.ceil(current / blockSize) - TITLE_SHIFT;

        return {
            total: blocks,
            current: currBlock,
            size: blockSize,
        };
    }

    isPrevDisabled = () => {
        return this.props.current <= BASE_SHIFT;
    }

    isNextDisabled = () => {
        return this.props.current >= (this.props.total - TITLE_SHIFT);
    }

    isPrevMoreHidden = () => {
        const blocks = this.calcBlocks();
        return (blocks.total === TITLE_SHIFT) || (blocks.current === BASE_SHIFT);
    }

    isNextMoreHidden = () => {
        const blocks = this.calcBlocks();
        return (blocks.total === TITLE_SHIFT) || (blocks.current === (blocks.total - TITLE_SHIFT));
    }

    visibleRange = () => {
        const blocks = this.calcBlocks();
        const start = blocks.current * blocks.size;
        const delta = this.props.total - start;
        const end = start + ((delta > blocks.size) ? blocks.size : delta);

        return [start + TITLE_SHIFT, end + TITLE_SHIFT];
    }

    handleFirstPage = () => {
        if (!this.isPrevDisabled()) {
            this.handlePageChanged(BASE_SHIFT);
        }
    }

    handlePreviousPage = () => {
        if (!this.isPrevDisabled()) {
            this.handlePageChanged(this.props.current - TITLE_SHIFT);
        }
    }

    handleNextPage = () => {
        if (!this.isNextDisabled()) {
            this.handlePageChanged(this.props.current + TITLE_SHIFT);
        }
    }

    handleLastPage = () => {
        if (!this.isNextDisabled()) {
            this.handlePageChanged(this.props.total - TITLE_SHIFT);
        }
    }

    handleMorePrevPages = () => {
        const blocks = this.calcBlocks();
        this.handlePageChanged((blocks.current * blocks.size) - TITLE_SHIFT);
    }

    handleMoreNextPages = () => {
        const blocks = this.calcBlocks();
        this.handlePageChanged((blocks.current + TITLE_SHIFT) * blocks.size);
    }

    handlePageChanged = (num) => {
        const handler = this.props.onPageChanged;
        if (handler) handler(num);
    }

    renderPages = (pair) => {
        return range(pair[0], pair[1]).map((num, idx) => {
            const current = num - TITLE_SHIFT;
            const onClick = this.handlePageChanged.bind(this, current);
            const isActive = (this.props.current === current);

            return (
                <Page
                    key={idx}
                    index={idx}
                    isActive={isActive}
                    className="btn-numbered-page"
                    onClick={onClick}
                >{num}</Page>
            );
        });
    }

    render() {
        const titles = this.getTitles.bind(this);
        let className = 'pagination';
        if (this.props.className) {
            className += ` ${ this.props.className}`;
        }

        return (
            <nav>
                <ul className={className}>
                    <Page
                        className="btn-first-page"
                        key="btn-first-page"
                        isDisabled={this.isPrevDisabled()}
                        onClick={this.handleFirstPage}
                    >{titles('first')}</Page>

                    <Page
                        className="btn-prev-page"
                        key="btn-prev-page"
                        isDisabled={this.isPrevDisabled()}
                        onClick={this.handlePreviousPage}
                    >{titles('prev')}</Page>

                    <Page
                        className="btn-prev-more"
                        key="btn-prev-more"
                        isHidden={this.isPrevMoreHidden()}
                        onClick={this.handleMorePrevPages}
                    >{titles('prevSet')}</Page>

                    {this.renderPages(this.visibleRange())}

                    <Page
                        className="btn-next-more"
                        key="btn-next-more"
                        isHidden={this.isNextMoreHidden()}
                        onClick={this.handleMoreNextPages}
                    >{titles('nextSet')}</Page>

                    <Page
                        className="btn-next-page"
                        key="btn-next-page"
                        isDisabled={this.isNextDisabled()}
                        onClick={this.handleNextPage}
                    >{titles('next')}</Page>

                    <Page
                        className="btn-last-page"
                        key="btn-last-page"
                        isDisabled={this.isNextDisabled()}
                        onClick={this.handleLastPage}
                    >{titles('last')}</Page>
                </ul>
            </nav>
        );
    }
}

Pager.defaultProps = {
    titles: TITLES,
};


const Page = (props) => {
    if (props.isHidden) return null;

    const baseCss = props.className ? `${props.className} ` : '';
    const fullCss = `${baseCss}${props.isActive ? ' active' : ''}${props.isDisabled ? ' disabled' : ''}`;

    return (
        <li key={props.index} className={fullCss}>
            <a onClick={props.onClick}>{props.children}</a>
        </li>
    );
};

function range(start, end) {
    const res = [];
    for (let i = start; i < end; i++) {
        res.push(i);
    }

    return res;
}

export default Pager;