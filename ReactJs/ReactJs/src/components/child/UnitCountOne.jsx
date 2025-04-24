import React from 'react';
import { Icon } from '@iconify/react';

const UnitCountOne = () => {
    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            <div className="col">
                <div className="card shadow-none h-100"
                    style={{ backgroundImage: "linear-gradient(to bottom, #192828, #726636)" }}>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-white mb-1">Total Users</p>
                                <h6 className="mb-0 text-white">20,000</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon icon="gridicons:multiple-users" className="text-white text-2xl mb-0" />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-white mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> +5000
                            </span>
                            Last 30 days users
                        </p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card shadow-none h-100"
                    style={{ backgroundImage: "linear-gradient(to bottom, #726636, #7D580C)" }}>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-white mb-1">Total Subscription</p>
                                <h6 className="mb-0 text-white">15,000</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                <Icon icon="fa-solid:award" className="text-white text-2xl mb-0" />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-white mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                                <Icon icon="bxs:down-arrow" className="text-xs" /> -800
                            </span>
                            Last 30 days subscription
                        </p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card shadow-none h-100"
                    style={{ backgroundImage: "linear-gradient(to bottom, #7D580C, #5A1515)" }}>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-white mb-1">Total Free Users</p>
                                <h6 className="mb-0 text-white">5,000</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                <Icon icon="fluent:people-20-filled" className="text-white text-2xl mb-0" />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-white mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> +200
                            </span>
                            Last 30 days users
                        </p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card shadow-none  h-100"
                    style={{ backgroundImage: "linear-gradient(to bottom, #5A1515, #26080C)" }}>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-white mb-1">Total Income</p>
                                <h6 className="mb-0 text-white">$42,000</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                                <Icon icon="solar:wallet-bold" className="text-white text-2xl mb-0" />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-white mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> +$20,000
                            </span>
                            Last 30 days income
                        </p>
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card shadow-none  h-100"
                    style={{ backgroundImage: "linear-gradient(to bottom, #26080C, #ef4a00)" }}>
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-white mb-1">Total Expense</p>
                                <h6 className="mb-0 text-white">$30,000</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                                <Icon icon="fa6-solid:file-invoice-dollar" className="text-white text-2xl mb-0" />
                            </div>
                        </div>
                        <p className="fw-medium text-sm text-white mt-12 mb-0 d-flex align-items-center gap-2">
                            <span className="d-inline-flex align-items-center gap-1 text-success-main">
                                <Icon icon="bxs:up-arrow" className="text-xs" /> +$5,000
                            </span>
                            Last 30 days expense
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UnitCountOne;
