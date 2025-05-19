import React, { useEffect, useState } from "react";

import { MainContainerContent } from "../../components/Containers/ContainerContent.style";
import { ContainerLista } from "../../components/Containers/ContainerList.style";
import { ListArea } from "../../components/Containers/ListArea.style";
import { ActionButton, SidebarButtons } from "../../components/Buttons/Button.style";
import { CardsArea } from "../../components/Containers/CardsArea.style";
import { RotatingIcon, PaginationAreaContainer, PaginationButtonsContainer } from "../../components/Containers/PaginationAreaContainer.style";
import PaginationOption from "../../components/PaginationOption/PaginationOption";


interface CardListViewProps<T> {
	items: T[];
	renderCard: (item: T, index: number) => React.ReactNode;
	actionButtons?: React.ReactNode;
	currentPage: number;
	totalItems: number;
	limit: number;
	onPageChange: (page: number) => void;
	onRefresh?: () => void;
	spinning?: boolean;
	children?: React.ReactNode; // Modais e afins
}

export function CardListView<T>({
	items,
	renderCard,
	actionButtons,
	currentPage,
	totalItems,
	limit,
	onPageChange,
	onRefresh,
	spinning,
	children
}: CardListViewProps<T>) {
	
    console.log(spinning)
	return (
		<MainContainerContent>
			<ContainerLista>
				<ListArea>
					<CardsArea>
						{items.map(renderCard)}
					</CardsArea>
				</ListArea>
				<PaginationAreaContainer>
					<PaginationButtonsContainer>
						<PaginationOption
							page={currentPage}
							total={totalItems}
							limit={limit}
							onPageChange={onPageChange}
						/>
					</PaginationButtonsContainer>

					{onRefresh && (
						<RotatingIcon spinning={spinning} onClick={onRefresh} size={20} />
					)}
				</PaginationAreaContainer>
			</ContainerLista>

			{actionButtons && (
				<SidebarButtons>{actionButtons}</SidebarButtons>
			)}

			{children}
		</MainContainerContent>
	);
}
